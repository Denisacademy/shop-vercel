"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <section className="grid md:grid-cols-2 gap-8 mt-4">
      <ReviewLoadingCard />
      <ReviewLoadingCard />
      <ReviewLoadingCard />
    </section>
  );
}

export default loading;
// make copy card author text rating
const ReviewLoadingCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="ml-4">
            <Skeleton className="w-[300px] h-4 mb-3" />
            <Skeleton className="w-[300px] h-4" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
