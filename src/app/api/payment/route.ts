import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20" as any,  
});

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid amount" },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency: "usd", // Pakistani Rupee
      payment_method_types: ["card"],
    });

    return NextResponse.json(
      { success: true, clientSecret: paymentIntent.client_secret },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create payment intent" },
      { status: 500 }
    );
  }
}