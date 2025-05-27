"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { getAllBookings } from "../../../../store/slices/bookingSlice";
import Image from "next/image";
import {
  FiCalendar,
  FiMapPin,
  FiDollarSign,
  FiUser,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiMail,
} from "react-icons/fi";
import { FaCarSide } from "react-icons/fa";

export default function AllBookedCars() {
  const dispatch = useDispatch<AppDispatch>();
  const { allBookings, loading, error } = useSelector(
    (state: RootState) => state.booking
  );

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "BOOKED":
        return <FiCheckCircle className="text-green-500" />;
      case "CANCELLED":
        return <FiXCircle className="text-red-500" />;
      default:
        return <FiClock className="text-yellow-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <FaCarSide className="text-4xl text-blue-500 mb-4 animate-bounce" />
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Loading your bookings...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-md text-center">
          <FiXCircle className="text-red-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Error Loading Bookings
          </h3>
          <p className="text-red-500 dark:text-red-400">{error}</p>
          <button
            onClick={() => dispatch(getAllBookings())}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!allBookings || allBookings.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <FaCarSide className="text-5xl text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
            No Bookings Found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            You haven't made any bookings yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Your Bookings
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            All your car rental bookings in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allBookings.map((booking: any) => (
            <div
              key={booking.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Car Image Header */}
              <div className="relative h-48 w-full">
                {booking.vehicle?.imageUrl ? (
                  <Image
                    src={booking.vehicle.imageUrl}
                    alt={booking.vehicle.carName || "Car"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <FaCarSide className="text-5xl text-gray-400 dark:text-gray-500" />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">
                    {booking.vehicle?.carName || "Unknown Car"}
                  </h3>
                  <p className="text-gray-300">
                    {booking.vehicle?.brand || "Unknown Brand"}
                  </p>
                </div>
              </div>

              {/* Booking Details */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {booking.id.substring(0, 8)}...
                  </span>
                  <div className="flex items-center">
                    {getStatusIcon(booking.status)}
                    <span className="ml-2 text-sm font-medium text-green-500">
                      {booking.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <FiUser className="flex-shrink-0 mt-1 text-gray-500 dark:text-gray-400" />
                    <div className="ml-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Customer
                      </p>
                      <div className="flex items-center text-gray-900 dark:text-white">
                        <FiUser className="mr-1" />
                        <span>
                          {booking.user?.firstName} {booking.user?.lastName}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-900 dark:text-white">
                        <FiMail className="mr-1" />
                        <span>{booking.user?.email || booking.userId}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FiMapPin className="flex-shrink-0 mt-1 text-gray-500 dark:text-gray-400" />
                    <div className="ml-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Route
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {booking.departurePoint} → {booking.arrivalPoint}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FiCalendar className="flex-shrink-0 mt-1 text-gray-500 dark:text-gray-400" />
                    <div className="ml-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Rental Period
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {formatDate(booking.rentalDate)} -{" "}
                        {formatDate(
                          new Date(
                            new Date(booking.rentalDate).setDate(
                              new Date(booking.rentalDate).getDate() +
                                booking.days -
                                1
                            )
                          ).toISOString()
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FiDollarSign className="flex-shrink-0 mt-1 text-gray-500 dark:text-gray-400" />
                    <div className="ml-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total Price
                      </p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        Rs. {booking.totalPrice}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Booked on {formatDate(booking.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
