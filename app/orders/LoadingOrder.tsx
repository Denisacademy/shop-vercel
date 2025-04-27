"use client";

import LoadingContainer from "@/components/global/LoadingContainer";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingOrder() {
  return (
    <div className="pt-12">
      <Card className="mb-4">
        <CardContent className="p-8 flex h-12 items-center justify-around w-full">
          <Skeleton className="h-7 w-2/6" />
          <Skeleton className="h-7 w-2/6" />
        </CardContent>
      </Card>
      <>
        <LoadingProduct />
        <LoadingProduct />
        <LoadingProduct />
        <LoadingProduct />
      </>
    </div>
  );
}

function LoadingProduct() {
  return (
    <>
      <Card>
        <CardContent className="w-full p-4 h-28 flex justify-between">
          <div className="w-1/2">
            <Skeleton className="h-4 w-[120px] mb-4" />
            <Skeleton className="h-4 w-[160px] mb-4" />
            <Skeleton className="h-4 w-[340px]" />
          </div>
          <div className="w-1/2 text-right flex flex-col items-end">
            <Skeleton className="h-4 w-1/5 mb-4" />
            <Skeleton className="h-4 w-1/5 mb-4" />
            <Skeleton className="h-4 w-[180px]" />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default LoadingOrder;
