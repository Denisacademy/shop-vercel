import CartItems from "@/components/cart/CartItems";
import CartTotal from "@/components/cart/CartTotal";
import SubmitButton from "@/components/form/Buttons";
import SectionTitle from "@/components/global/SectionTitle";
import { placeOrderAction, updateCart } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import FormContainer from "../../components/form/FormContainer";

async function Cart() {
  const { userId } = auth();
  if (!userId) redirect("/");

  const cart = await updateCart(userId);
  if (!cart) return <SectionTitle text="Empty Cart" />;

  return (
    <>
      <SectionTitle text="Shopping Cart" />

      <div className="grid grid-cols-6 gap-8 mt-8">
        {/* <div className="col-span-1">COLS_6</div> */}
        <div className="col-span-4">{<CartItems items={cart.cartItems} />}</div>
        <div className="col-span-2">{<CartTotal cart={cart.updatedCart} />}</div>
      </div>
    </>
  );
}

export default Cart;
