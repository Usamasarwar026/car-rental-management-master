"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState, useAppSelector } from "../../store/store";
import {
  createBooking,
  resetBookingState,
} from "../../store/slices/bookingSlice";
import { useSession } from "next-auth/react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Initialize stripePromise
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

// Subcomponent to ensure hooks are called within <Elements>
const BookingFormContent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success, data } = useAppSelector(
    (state: RootState) => state.booking
  );
  const { data: sessionData } = useSession();
  const searchParams = useSearchParams();
  const stripe = useStripe(); // Moved inside subcomponent
  const elements = useElements(); // Moved inside subcomponent
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const carIdFromURL = searchParams.get("carId");
  const brand = searchParams.get("brand");
  const carName = searchParams.get("carName");
  const carImage = searchParams.get("carImage");
  const price = searchParams.get("price");
  const engine = searchParams.get("engine");

  const [formData, setFormData] = useState({
    userId: "",
    carId: carIdFromURL || "",
    tripType: "ONEWAY",
    departurePoint: "",
    arrivalPoint: "",
    totalPrice: 0,
    days: 1,
    rentalDate: "",
  });

  // Fetch Stripe client secret when totalPrice is updated
  useEffect(() => {
    if (formData.totalPrice > 0) {
      const fetchClientSecret = async () => {
        try {
          const response = await fetch("/api/payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: formData.totalPrice * 100 }), // Convert to cents
          });
          const data = await response.json();
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            setPaymentError("Failed to initialize payment");
          }
        } catch (err) {
          setPaymentError("Error initializing payment");
        }
      };
      fetchClientSecret();
    }
  }, [formData.totalPrice]);

  // Update userId and carId when session or URL changes
  useEffect(() => {
    if (sessionData?.user?.id) {
      setFormData((prev) => ({
        ...prev,
        userId: sessionData.user.id,
        carId: carIdFromURL || prev.carId,
      }));
    }
  }, [sessionData, carIdFromURL]);

  // Update totalPrice based on days and price from URL
  useEffect(() => {
    const priceNum = parseFloat(price || "0");
    const daysNum = formData.days || 1;
    const tripMultiplier = formData.tripType === "TWOWAY" ? 2 : 1;
    const calculatedPrice = priceNum * daysNum * tripMultiplier;
    setFormData((prev) => ({
      ...prev,
      totalPrice: Number(calculatedPrice.toFixed(2)),
    }));
  }, [formData.days, formData.tripType, price]);

  // Reset form after successful booking
  useEffect(() => {
    if (success) {
      setFormData({
        userId: sessionData?.user?.id || "",
        carId: carIdFromURL || "",
        tripType: "ONEWAY",
        departurePoint: "",
        arrivalPoint: "",
        totalPrice: parseFloat(price || "0") || 0,
        days: 1,
        rentalDate: "",
      });
      setTimeout(() => {
        dispatch(resetBookingState());
      }, 3000);
    }
  }, [success, dispatch, sessionData, carIdFromURL, price]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "totalPrice" || name === "days"
          ? parseFloat(value) || (name === "days" ? 1 : 0)
          : value,
    }));
  };

  const handlePayment = async () => {
    if (!stripe || !elements || !clientSecret) {
      setPaymentError("Payment system not initialized");
      return;
    }
    console.log("handle payment", stripe, elements, clientSecret);

    setPaymentLoading(true);
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setPaymentError("Card details not provided");
      setPaymentLoading(false);
      return;
    }

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: sessionData?.user?.name || "Anonymous",
            email: sessionData?.user?.email || undefined,
            address: {
              country: "PK",
            },
          },
        },
      }
    );
    console.log("intent payment", paymentIntent);

    if (error) {
      setPaymentError(error.message + "heelo" || "Payment failed"); //error here
      setPaymentLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      const isoRentalDate = new Date(formData.rentalDate).toISOString();
      const bookingData = {
        ...formData,
        rentalDate: isoRentalDate,
        paymentIntentId: paymentIntent.id,
      };
      dispatch(createBooking(bookingData));
    }
    setPaymentLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.userId) {
      alert("Please log in to create a booking");
      return;
    }
    if (formData.totalPrice <= 0) {
      alert("Total price must be greater than 0");
      return;
    }
    if (formData.days < 1) {
      alert("Number of days must be at least 1");
      return;
    }
    if (!formData.rentalDate) {
      alert("Please select a rental date");
      return;
    }

    handlePayment();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Book your Car
        </h2>

        <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Selected Car Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p>
              <strong className="text-gray-600">Car ID:</strong>{" "}
              {carIdFromURL || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Brand:</strong> {brand || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Car Name:</strong>{" "}
              {carName || "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Price per Day:</strong>{" "}
              {price ? `Rs. ${price}` : "N/A"}
            </p>
            <p>
              <strong className="text-gray-600">Engine:</strong>{" "}
              {engine || "N/A"}
            </p>
          </div>
          {carImage && (
            <div className="mt-4 flex justify-center">
              <img
                src={carImage}
                alt="Car"
                className="w-full max-w-xs rounded-lg shadow-md object-cover"
              />
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User ID
              </label>
              <p className="p-3 bg-gray-100 rounded-md text-gray-600">
                {formData.userId || "Not logged in"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Car ID
              </label>
              <p className="p-3 bg-gray-100 rounded-md text-gray-600">
                {formData.carId || "Loading..."}
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="tripType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Trip Type
            </label>
            <select
              id="tripType"
              name="tripType"
              value={formData.tripType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ONEWAY">One Way</option>
              <option value="TWOWAY">Two Way</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="departurePoint"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Departure Point
            </label>
            <input
              id="departurePoint"
              type="text"
              name="departurePoint"
              value={formData.departurePoint}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter departure city"
            />
          </div>

          <div>
            <label
              htmlFor="arrivalPoint"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Arrival Point
            </label>
            <input
              id="arrivalPoint"
              type="text"
              name="arrivalPoint"
              value={formData.arrivalPoint}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter arrival city"
            />
          </div>

          <div>
            <label
              htmlFor="days"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Number of Days
            </label>
            <input
              id="days"
              type="number"
              name="days"
              value={formData.days}
              onChange={handleChange}
              required
              min="1"
              step="1"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter number of days"
            />
          </div>

          <div>
            <label
              htmlFor="totalPrice"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Total Price (Rs.)
            </label>
            <input
              id="totalPrice"
              type="number"
              name="totalPrice"
              value={formData.totalPrice}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              placeholder="Total price (calculated)"
              readOnly
            />
          </div>

          <div>
            <label
              htmlFor="rentalDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Rental Date
            </label>
            <input
              id="rentalDate"
              type="date"
              name="rentalDate"
              value={formData.rentalDate}
              onChange={handleChange}
              required
              min={new Date().toISOString().split("T")[0]}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Details
            </label>
            <CardElement
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": { color: "#aab7c4" },
                  },
                  invalid: { color: "#9e2146" },
                },
              }}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={
                loading || paymentLoading || !formData.userId || !clientSecret
              }
              className={`w-full p-3 rounded-md text-white font-semibold transition-colors duration-200 ${
                loading || paymentLoading || !formData.userId || !clientSecret
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {paymentLoading
                ? "Processing Payment..."
                : loading
                ? "Booking..."
                : "Pay and Book"}
            </button>
          </div>
        </form>

        {paymentError && (
          <p className="mt-4 text-red-600 font-medium text-center">
            {paymentError}
          </p>
        )}
        {error && (
          <p className="mt-4 text-red-600 font-medium text-center">{error}</p>
        )}
        {success && (
          <div className="mt-4 text-center">
            <p className="text-green-600 font-medium">
              Booking and Payment Successful! Invoice generated.
            </p>
            {data?.invoice && (
              <a
                href={`data:application/pdf;base64,${data.invoice}`}
                download={`invoice-${data.id}.pdf`}
                className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Download Invoice
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const BookingForm = () => {
  if (!stripePromise) {
    return (
      <div>
        Error: Stripe is not configured correctly. Please contact support.
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <BookingFormContent />
    </Elements>
  );
};

export default BookingForm;





