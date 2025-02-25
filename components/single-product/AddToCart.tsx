"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import SelectProductAmount from "./SelectProductAmount";
import { useUser } from "@clerk/nextjs";
import SubmitButton, { ProductSignInButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";
import { addToCart } from "@/utils/actions";

function AddToCart({ productId }: { productId: string }) {
  const [amount, setAmount] = useState(1);
  const { user } = useUser();
  console.log(user);
  return (
    <>
      <SelectProductAmount setAmount={setAmount} amount={amount} />

      {user ? (
        <FormContainer action={addToCart}>
          <input hidden name="productId" value={productId} />
          <input hidden name="amount" value={amount} />
          <SubmitButton text="add to cart" />
        </FormContainer>
      ) : (
        <ProductSignInButton />
      )}
    </>
  );
}

export default AddToCart;
