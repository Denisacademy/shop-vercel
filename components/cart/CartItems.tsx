import CartItem from "./CartItem";

function CartItems({ items }: { items: any }) {
  return (
    <div>
      {items.map((item: any) => {
        const product = item.product;
        const { amount, id } = item;
        const { company, name, price, image } = product;
        return (
          <CartItem key={name} company={company} name={name} price={price} image={image} amount={amount} />
        );
      })}
    </div>
  );
}

export default CartItems;
