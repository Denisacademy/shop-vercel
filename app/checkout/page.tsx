"use client";

import React, { useCallback } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { usePathname, useSearchParams } from "next/navigation";
// import { fetchClientSecret } from '../actions/stripe'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function Checkout() {
  const searchParams = useSearchParams();
  const cartId = searchParams.get("cartId");
  const pathname = usePathname();

  const fetchClientSecret = useCallback(async (): Promise<string> => {
    const request = await axios.post(`/api/payment`, {
      cartId,
      orderId: "",
    });
    return request.data.client_secret;
  }, []);

  console.log(`"cartId"`, fetchClientSecret);

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
