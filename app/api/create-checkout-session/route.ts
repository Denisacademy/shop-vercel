const YOUR_DOMAIN = "http://localhost:3000";
import Stripe from "stripe";
import db from "@/utils/db";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // apiVersion: "2020-08-27",
});

//const stripe = require('stripe')('sk_test_51KQsCaC1oVZwjWuv7DW2lqvSbL8qNLiwM7ZTwSMp2CD5ZfgfubeP9o7oEuS2OJY0rAKYTOP1JMWRac96SbbMdebx00fmLG9Oyq');

export const POST = async (req: NextRequest, res: NextResponse) => {
  // console.log("POST_Create a Checkout Session", req.body);
  console.log("POST_Create a Checkout Session");
  const cart = await db.cart.findUnique({
    where: {
      id: "46b83548-a914-4ea0-aa08-13ed8a59b19b",
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });
  // console.log("Array", cart?.cartItems);
  // if (!cart) {
  //   return Response.json(null, { status: 404, statusText: "not found" });
  // }
  // const line_items = cartItems.map((item:any) => {
  //   return { quantity: 4}
  // )
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: "test",
              images: [""],
            },
            unit_amount: 1,
          },
        },
      ],
      automatic_tax: {
        enabled: true,
      },
      mode: "payment",
      ui_mode: "embedded",
      // return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
      return_url: `${YOUR_DOMAIN}`,
    });
    console.log("S-E-S-S-I-O-N", session);
    // Response.json({ clientSecret: session.client_secret });
    return Response.json({ clientSecret: "test" });
  } catch (error) {
    return Response.json(null, { status: 300, statusText: "Internal Server Error" });
  }
};

import { fetchFeaturedProducts } from "@/utils/actions";
// import {db} from '@/utils/db'

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const products = await fetchFeaturedProducts();
  // console.log("PRODUCTS", products);
  // return NextResponse.json({ products });
  return Response.json(products);
};
