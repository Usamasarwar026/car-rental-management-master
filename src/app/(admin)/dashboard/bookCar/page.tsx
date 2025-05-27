"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../../../store/store";
import { getUserBookings } from "../../../../store/slices/bookingSlice";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FiCalendar, FiMapPin, FiDollarSign, FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { FaCarAlt } from "react-icons/fa";

const BookCar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userBookings, loading, error } = useAppSelector(
    (state) => state.booking
  );
  const session = useSession();
  const userId = session.data?.user.id;

  useEffect(() => {
    if (userId) {
      dispatch(getUserBookings(userId));
    }
  }, [dispatch, userId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "BOOKED":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <FiCheckCircle className="mr-1" /> Booked
          </span>
        );
      case "CANCELLED":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <FiXCircle className="mr-1" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <FiClock className="mr-1" /> Pending
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-md text-center">
          <FiXCircle className="text-red-500 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Error Loading Bookings
          </h3>
          <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={() => userId && dispatch(getUserBookings(userId))}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!Array.isArray(userBookings) || userBookings.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <FaCarAlt className="text-5xl text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
            No Bookings Yet
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
            My Bookings
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            All your upcoming and past car rentals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userBookings.map((booking) => (
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
                    priority={false}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <FaCarAlt className="text-5xl text-gray-400 dark:text-gray-500" />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">
                    {booking.vehicle?.carName || "Unknown Car"}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-300 text-sm">
                      {booking.vehicle?.brand || "Unknown Brand"}
                    </span>
                    <span className="text-white font-semibold">
                      Rs. {booking.totalPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Booking ID
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {booking.id.substring(0, 8)}...
                    </p>
                  </div>
                  {getStatusBadge(booking.status)}
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <FiMapPin className="flex-shrink-0 mt-1 text-gray-500 dark:text-gray-400" />
                    <div className="ml-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Trip Route
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
                              new Date(booking.rentalDate).getDate() + booking.days - 1
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
                        Trip Type
                      </p>
                      <p className="text-gray-900 dark:text-white capitalize">
                        {booking.tripType.toLowerCase()}
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
};

export default BookCar;