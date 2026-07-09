
import { NextResponse } from "next/server";
import { prisma } from "@/config/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20" as any,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid payload received" },
        { status: 400 }
      );
    }

    const {
      userId,
      carId,
      tripType,
      departurePoint,
      arrivalPoint,
      totalPrice,
      days,
      rentalDate,
      paymentIntentId,
    } = body;

    // Validate required fields
    if (
      !userId ||
      !carId ||
      !tripType ||
      !departurePoint ||
      !arrivalPoint ||
      totalPrice === undefined ||
      !days ||
      !rentalDate ||
      !paymentIntentId
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate user
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 400 }
      );
    }

    // Validate car
    const car = await prisma.vehicle.findUnique({ where: { id: carId } });
    if (!car) {
      return NextResponse.json(
        { success: false, message: "Car not found" },
        { status: 400 }
      );
    }

    // Validate rentalDate
    const parsedRentalDate = new Date(rentalDate);
    if (isNaN(parsedRentalDate.getTime())) {
      return NextResponse.json(
        { success: false, message: "Invalid rentalDate format" },
        { status: 400 }
      );
    }

    // Validate totalPrice
    const parsedTotalPrice = parseFloat(totalPrice);
    if (isNaN(parsedTotalPrice) || parsedTotalPrice <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid totalPrice format" },
        { status: 400 }
      );
    }

    // Verify Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== "succeeded") {
      return NextResponse.json(
        { success: false, message: "Payment not completed" },
        { status: 400 }
      );
    }

    // ✅ Create Booking
    const booking = await prisma.booking.create({
      data: {
        userId,
        vehicleId: carId,
        tripType,
        departurePoint,
        arrivalPoint,
        totalPrice: parsedTotalPrice,
        status: "BOOKED",
        days,
        rentalDate: parsedRentalDate,
        paymentIntentId,  // optional if you have this field in Booking
      },
    });

    // ✅ Create Payment linked with Booking
    const payment = await prisma.payment.create({
      data: {
        bookingId: booking.id,
        stripePaymentId: paymentIntent.id,
        amount: parsedTotalPrice,
        status: "PAID",  // PaymentStatus enum
      },
    });

    // ✅ Create Invoice linked with Payment & Booking
    const invoice = await prisma.invoice.create({
      data: {
        bookingId: booking.id,
        paymentId: payment.id,
        invoiceNumber: `INV-${Date.now()}`,
        invoiceUrl: 'https://example.com/invoice.pdf',  
        paymentStatus: "PAID",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Booking, Payment, and Invoice created successfully",
        data: {
          booking,
          payment,
          invoice,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Booking creation error:", {
      message: error.message,
      stack: error.stack,
      code: error.code,
      meta: error.meta,
    });
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message || "Unknown error occurred during booking creation",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Missing userId query parameter" },
        { status: 400 }
      );
    }

    const bookings = await prisma.booking.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        vehicle: {
          select: {
            carName: true,
            imageUrl: true,
            brand: true,
            price: true,
          },
        },
        payment: true,
        invoice: {
          select: {
            id: true,
            invoiceNumber: true,
            invoiceUrl: true,
            paymentStatus: true,
            createdAt: true,
          },
        },
      },
    });

    return NextResponse.json(
      { success: true, data: bookings },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
