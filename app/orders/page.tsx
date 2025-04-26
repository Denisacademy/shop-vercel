import SectionTitle from "@/components/global/SectionTitle";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { fetchOrdersByUser, searchParams, SortField, SortOrder } from "@/utils/actions";
import { formatCurrency, formatdDate } from "@/utils/format";
import Link from "next/link";
import { redirect } from "next/navigation";
// {sortPrice='asc'}

import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
//total up  tas up tax down total up
async function OrdersPage({
  params,
  searchParams,
}: {
  params: Promise<{ params: string }>;
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const paramsField = await searchParams;

  const sortField = paramsField.sortField === undefined ? "orderTotal" : paramsField.sortField;
  const sortOrder = paramsField.orderBy === undefined || paramsField.orderBy === "asc" ? "desc" : "asc";

  const orders = await fetchOrdersByUser(sortField, sortOrder);

  const SortLink = ({ value }: { value: string }) => {
    const isActive = sortField === value ? "text-green-600 font-medium" : "";

    return (
      <>
        <Link
          className={`${isActive && sortOrder ? isActive : ""} flex items-center `}
          href={`/orders?sortField=${value}&orderBy=${sortOrder && isActive ? sortOrder : "asc"}`}
        >
          {value}
          {sortField === value ? (
            sortOrder === "asc" ? (
              <GoTriangleUp className="size-5" />
            ) : (
              <GoTriangleDown className="size-5" />
            )
          ) : (
            ""
          )}
        </Link>
      </>
    );
  };

  if (!orders) redirect("/");

  return (
    <>
      <div className="flex justify-around items-center mb-8 p-2 bg-secondary">
        <h2 className="text-3xl font-medium tracking-wider capitalize text-primary">your orders history</h2>

        <div className="inline-flex items-center gap-3">
          <span className="font-medium">sort by:</span>
          <SortLink value="createdAt" />
          <SortLink value="orderTotal" />
          {/* <h3>
            {sortOrder === "asc" ? (
              <GoTriangleUp className="size-8" />
            ) : (
              <GoTriangleDown className="size-8" />
            )}
          </h3> */}
        </div>
      </div>

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
