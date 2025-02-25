import SectionTitle from "@/components/global/SectionTitle";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { fetchOrdersByUser } from "@/utils/actions";
import { formatCurrency, formatdDate } from "@/utils/format";
import Link from "next/link";
import { redirect } from "next/navigation";

async function OrdersPage() {
  const orders = await fetchOrdersByUser();
  if (!orders) redirect("/");

  return (
    <>
      <h2 className="text-3xl font-medium tracking-wider capitalize mb-8">your orders history</h2>

      <Card>
        {orders.map((order) => {
          const { id, createdAt, isPaid, orderTotal } = order;

          const formatedDate = formatdDate("ru-Ru", createdAt);
          return (
            <div key={id} className="p-4 border-b-2">
              <div className="flex justify-between items-center mb-2">
                <h3>ID: {id.slice(-5)}</h3>
                <h3 className="text-gray-500  rounded-md">{formatedDate}</h3>
              </div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="bg-secondary capitalize px-4 text-green-500 rounded-sm">
                  {isPaid && "order paid"}
                </h3>
                <h3 className="text-green-500 font-bold">{formatCurrency(orderTotal)}</h3>
              </div>
              <div className="flex justify-between items-center">
                <h3>Street: 354 Oyster Point Boulevard</h3>
                <Link
                  className="hover:bg-green-500 hover:text-primary-foreground border  border-primary text-primary px-4 py-1 rounded-full"
                  href={`orders/${id}/details`}
                >
                  order details
                </Link>
              </div>
              {/* <Separator /> */}
            </div>
          );
        })}
      </Card>
    </>
  );
}

export default OrdersPage;
