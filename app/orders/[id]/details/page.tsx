import { fetchSingleOrderDetails } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import SectionTitle from "@/components/global/SectionTitle";

import { formatCurrency, formatdDate } from "@/utils/format";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import Image from "next/image";

import { Button } from "@/components/ui/button";

async function OrderDetails({ params }: { params: { id: string } }) {
  const { userId } = auth();
  if (!userId) redirect("/");
  const order = await fetchSingleOrderDetails(params.id);

  if (!order) return <SectionTitle text="order not found" />;
  const { orderId, items, createdAt } = order;
  console.log("OrderDetails", order);

  const formatedDate = formatdDate("ru-Ru", createdAt);

  return (
    <div>
      <div className="flex justify-between mb-4 p-5 rounded-lg items-center border border-secondary">
        <h2 className="text-2xl">ID: {orderId.slice(-5)}</h2>
        <h3 className="capitalize px-4 py-2 text-md text-foreground rounded-sm">from {formatedDate}</h3>
        <button
          className="hover:bg-secondary hover:text-muted-foreground border px-6 py-2 rounded-full"
          // href={`orders/${id}/details`}
        >
          hide details
        </button>
      </div>
      <h2 className="text-3xl font-medium tracking-wider capitalize mb-4">your cart</h2>
      {/* <ProductsList products={items} /> */}
      <div className="mt-4">
        {items.map((item) => {
          const { price, image, name, company } = item;
          const dollarsAmount = formatCurrency(price);
          const { id: productId } = item;
          return (
            <article key={productId} className="relative mb-4">
              <Card className="border-width-[1px]">
                <CardContent className="p-8 gap-x-8 flex">
                  <div className="relative h-32  md:h-24 md:w-24">
                    <Image
                      src={image}
                      alt={name}
                      // fill
                      width={125}
                      height={125}
                      // sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                      priority
                      className="w-[125px] rounded-md object-cover"
                    />
                  </div>

                  <h2 className="text-xl capitalize">{name}</h2>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-muted-foreground text-lg">1 pck * {dollarsAmount}</p>
                  <p className="text-primary  text-lg">{dollarsAmount}</p>
                </CardFooter>
              </Card>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default OrderDetails;
