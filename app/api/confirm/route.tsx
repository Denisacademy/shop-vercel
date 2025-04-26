import { redirect, useSearchParams } from "next/navigation";
import { NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url); //URL
  const searchParams = new URLSearchParams(url.search); //

  const session_id = searchParams.get("session_id");
  const session = await stripe.checkout.sessions.retrieve(session_id || "");
  console.log("*STATUS*", session.status);
  redirect(`/orders`);
};
