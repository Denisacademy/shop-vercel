import { changeAmountAction, placeOrderAction } from "@/utils/actions";
import FormContainer from "../form/FormContainer";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { Cart } from "@prisma/client";
import { formatCurrency } from "@/utils/format";
import PlaceOrder from "./PlaceOrder";

async function CartTotal({ cart }: { cart: Cart }) {
  const { orderTotal, tax, shipping, cartTotal } = cart;
  return (
    <div>
      <Card className="p-4 mb-4">
        <p className="flex justify-between py-2">
          <span>Subtotal</span>
          <span>{formatCurrency(cartTotal)}</span>
        </p>
        <Separator className="shrink" />
        <p className="flex justify-between py-2">
          <span>Shipping</span>
          <span>{formatCurrency(shipping)}</span>
        </p>
        <Separator className="shrink" />
        <p className="flex justify-between py-2">
          <span>Tax</span>
          <span>{formatCurrency(tax)}</span>
        </p>
        <Separator className="shrink" />
        <p className="flex justify-between py-4">
          <span className="font-bold">Order Total</span>
          <span className="font-bold">{formatCurrency(orderTotal)}</span>
        </p>
      </Card>

      {/* <FormContainer action={placeOrderAction}>
        <Button className="w-full">Place Order</Button>
      </FormContainer> */}
      <PlaceOrder />
    </div>
  );
}

export default CartTotal;
