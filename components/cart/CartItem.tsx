import { changeAmountAction, fetchProduct } from "@/utils/actions";
import { Card } from "../ui/card";
import FormContainer from "../form/FormContainer";
import { RatingInputAmount } from "../reviews/RatingInput";
import { Button } from "../ui/button";
import { formatCurrency } from "@/utils/format";
import SubmitButton from "../form/Buttons";

type CartItemType = {
  image: string;
  name: string;
  company: string;
  price: number;
  amount?: number;
};
//{image, name, company, price}: CartItemType
async function CartItem({ name, image, company, price, amount }: CartItemType) {
  // const product_ = await fetchProduct("48d3271a-0e60-4826-bd9b-5730e278effd");
  // const { image, name, company, price } = product_;
  const formatedPrice = formatCurrency(price);
  return (
    <Card className="p-4 grid grid-cols-4 mb-8">
      <img src={image} className="rounded-md w-[100px] h-[100px] col-span-1" />
      <div className="col-span-1">
        <p className="text-sm font-bold">{name}</p>
        <p className="text-sm">{company}</p>
      </div>
      <div>
        <RatingInputAmount amount={amount} name="amount :" />
        <div className="mt-4">
          <FormContainer action={changeAmountAction}>
            <SubmitButton text="remove"></SubmitButton>
          </FormContainer>
        </div>
      </div>
      <p className="text-right">{formatedPrice}</p>
    </Card>
  );
}

export default CartItem;
