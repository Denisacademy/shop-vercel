import { fetchOrCreateCart } from "@/utils/actions";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import db from "@/utils/db";
import CartItems from "@/components/cart/CartItems";
export const POST = async (req: NextRequest) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const origin = headers().get("origin");
  const data = await req.json();

  // console.log(`"D_A_T_A"`, data);
  const cart = await db.cart.findFirst({
    where: { id: data.cardId },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });
  console.log("*CART*", cart?.cartItems);
  const line_items = cart?.cartItems.map((item, index) => {
    console.log("TEST_LINE_ITEM", index);
    const { name, price, description, image } = item.product;
    return {
      price_data: {
        currency: "usd",
        unit_amount: price * 100, //our price
        product_data: {
          name,
          description,
          images: [image],
        },
      },

      quantity: item.amount, //show more one
    };
  });
  // console.log(`"line_items"`, line_items);
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    metadata: { cartId: data?.cartId },
    line_items,
    mode: "payment",
    return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`, //origin/api/confirm
  });
  console.log("*session*", session);
  return NextResponse.json({ client_secret: session.client_secret });
  // return NextResponse.json({ msg: "get some" }, { status: 200 });
};
