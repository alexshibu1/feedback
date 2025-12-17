import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/app/libs/mongoose";
import Users from "@/app/models/Users";
import Stripe from "stripe";

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.successUrl || !body.cancelUrl) {
      return NextResponse.json(
        { error: "successUrl and cancelUrl are required" },
        { status: 400 }
      );
    }

    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate environment variables
    if (!process.env.STRIPE_API_KEY) {
      console.error("STRIPE_API_KEY is missing");
      return NextResponse.json(
        { error: "Stripe API key is not configured" },
        { status: 500 }
      );
    }

    if (!process.env.STRIPE_PRICE_ID) {
      console.error("STRIPE_PRICE_ID is missing");
      return NextResponse.json(
        { error: "Stripe price ID is not configured" },
        { status: 500 }
      );
    }

    await connectMongo();
    const user = await Users.findById(session.user.id);

    if (!user || !user.email) {
      return NextResponse.json(
        { error: "User not found or email missing" },
        { status: 404 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: body.successUrl,
      cancel_url: body.cancelUrl,
      customer_email: user.email,
      client_reference_id: user._id.toString(),
    });

    return NextResponse.json({ url: stripeCheckoutSession.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to create checkout session",
        details: error.type || "Unknown error",
      },
      { status: 500 }
    );
  }
}
