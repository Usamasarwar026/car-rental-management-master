"use client";
import React, { useEffect } from "react";
import { usePDF } from 'react-to-pdf';
import { getUserBookings } from "@/store/slices/bookingSlice";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/store/store";
import { useAppSelector } from "@/store/slices/store";

const Invoice: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { userBookings, loading, error } = useAppSelector((state) => state.booking);

  useEffect(() => {
    if (userId) {
      dispatch(getUserBookings(userId));
    }
  }, [userId, dispatch]);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-4xl mx-auto">
      <p>Error: {error}</p>
    </div>
  );
  
  if (!userBookings || userBookings.length === 0) return (
    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 max-w-4xl mx-auto">
      <p>No invoices available</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Your Invoices</h2>
      
      <div className="space-y-6">
        {userBookings.map((booking) => {
          const payment = booking.payment;
          const invoice = booking.invoice;
          const car = booking.vehicle;

          if (!payment || !invoice) return null;

          return (
            <InvoiceItem 
              key={booking.id}
              booking={booking}
              invoice={invoice}
              payment={payment}
              car={car}
            />
          );
        })}
      </div>
    </div>
  );
};

const InvoiceItem = ({ booking, invoice, payment, car }: any) => {
  const { toPDF, targetRef } = usePDF({
    filename: `invoice-${invoice.invoiceNumber}.pdf`,
  });

  return (
    <div ref={targetRef} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-500 p-4">
        <h3 className="text-xl font-bold text-white">INVOICE #{invoice.invoiceNumber}</h3>
        <button 
          onClick={() => toPDF()}
          className="bg-white text-blue-600 hover:bg-gray-100 px-3 py-1 rounded flex items-center text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download
        </button>
      </div>

      <div className="p-6">
        {/* Invoice Header */}
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-600">Status: <span className="font-semibold">{invoice.paymentStatus}</span></p>
            </div>
            <div className="text-right">
              <p className="text-gray-500">Date</p>
              <p className="font-medium">{new Date(invoice.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 text-gray-700">Booking Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p><span className="font-medium text-gray-600">Booking ID:</span> {booking.id}</p>
              <p><span className="font-medium text-gray-600">Trip Type:</span> {booking.tripType}</p>
              <p><span className="font-medium text-gray-600">Departure:</span> {booking.departurePoint}</p>
              <p><span className="font-medium text-gray-600">Arrival:</span> {booking.arrivalPoint}</p>
            </div>
            <div className="space-y-2">
              <p><span className="font-medium text-gray-600">Rental Date:</span> {new Date(booking.rentalDate).toLocaleDateString()}</p>
              <p><span className="font-medium text-gray-600">Duration:</span> {booking.days} days</p>
              <p><span className="font-medium text-gray-600">Total Price:</span> Rs. {booking.totalPrice}</p>
            </div>
          </div>
        </div>

        {/* Car Details */}
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 text-gray-700">Car Details</h4>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <p className="font-medium text-gray-600 mb-1">Vehicle</p>
              <p className="text-lg">{car?.brand} {car?.carName}</p>
              <p className="mt-2"><span className="font-medium text-gray-600">Price per Day:</span> Rs. {car?.price || "N/A"}</p>
            </div>
            {car?.imageUrl && (
              <div className="w-48 h-32 rounded-lg overflow-hidden border border-gray-200">
                <img 
                  src={car.imageUrl} 
                  alt={car.carName} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Payment Details */}
        <div>
          <h4 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 text-gray-700">Payment Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p><span className="font-medium text-gray-600">Payment ID:</span> {payment.stripePaymentId}</p>
              <p><span className="font-medium text-gray-600">Status:</span> <span className="capitalize">{payment.status}</span></p>
            </div>
            <div className="space-y-2">
              <p><span className="font-medium text-gray-600">Amount Paid:</span> Rs. {payment.amount}</p>
              <p><span className="font-medium text-gray-600">Payment Date:</span> {new Date(payment.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <p className="text-sm text-gray-500 text-center">Thank you for choosing our service!</p>
      </div>
    </div>
  );
};

export default Invoice;