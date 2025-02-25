"use client";
import { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const staticText = `This is Sitecore's default approach. The problem with this approach is, that if if you add body_2col to the same page more than once, this model has a problem. `;
const stripePromise = loadStripe(
  "pk_test_51KQsCaC1oVZwjWuvAPTVdA7r01xf1HScwZNCl4s6NPtGhnT8O5KlgJibahRZ6Q9iTNuxXOHbSvwhALC6sXCd8hdn00D0fLEjD9"
);

function Comment({ text }: { text: string }) {
  const [showMoreText, setShowMoreText] = useState(false);

  // const fetchClientSecret = useCallback(() => {
  //   // Create a Checkout Session
  //   return fetch("https://jsonplaceholder.typicode.com/comments?postId=1", {
  //     method: "GET",
  //   })
  //     .then((res) => {
  //       console.log("Comment");
  //       res.json();
  //     })
  //     .then((data) => data);
  // }, []);

  // console.log(fetchClientSecret);
  const textLen = showMoreText ? staticText : staticText.slice(0, 110);
  return (
    <>
      <p className="text-sm">{textLen}</p>
      <button
        className="text-muted-foreground hover:underline"
        onClick={() => setShowMoreText((prev) => !prev)}
      >
        {/* {!showMoreText ? "Show More" : "Show Less"} */}
        {!showMoreText ? "Show More" : <CheckoutForm />}
      </button>
    </>
  );
}

export default Comment;

const CheckoutForm = () => {
  const fetchClientSecret = useCallback(() => {
    console.log("Create a Checkout Session");
    // const data = fetch("/api/create-checkout-session");
    // console.log(data);
    return fetch("/api/create-checkout-session", {
      method: "POST",
    })
      .then((res) => {
        console.log("res", res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        return data.clientSecret;
      });
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};
