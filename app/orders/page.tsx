import Link from "next/link";

import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import OrdersContainer from "./OrdersContainer";
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

  return (
    <>
      <div className="flex justify-around items-center mb-8 p-2 bg-secondary">
        <h2 className="text-3xl font-medium tracking-wider capitalize text-primary">your orders history</h2>

        <div className="inline-flex items-center gap-3">
          <span className="font-medium">sort by:</span>
          <SortLink value="createdAt" />
          <SortLink value="orderTotal" />
        </div>
      </div>

      <OrdersContainer sortField={sortField} sortOrder={sortOrder} />
    </>
  );
}

export default OrdersPage;
