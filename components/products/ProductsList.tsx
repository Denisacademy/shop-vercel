import { Product } from "@prisma/client";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import FavoriteToggleButton from "./FavoriteToggleButton";
import { formatCurrency } from "@/utils/format";

function ProductsList({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="mt-12 grid gap-y-8">
      {products.map((product) => {
        const { price, image, name, company } = product;
        const dollarsAmount = formatCurrency(price);
        const { id: productId } = product;
        return (
          <article key={productId} className="relative">
            <Link href={`/products/${productId}`}>
              <Card>
                <CardContent className="p-8 gap-y-4 grid grid-cols-3">
                  <div className="relative h-64  md:h-48 md:w-48">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                      priority
                      className="w-full rounded-md object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold capitalize">
                      {name}
                    </h2>
                    <h4 className="text-muted-foreground">
                      {company}
                    </h4>
                  </div>
                  <p className="text-muted-foreground text-lg md:ml-auto">
                    {dollarsAmount}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute bottom-7 right-7 z-5">
              <FavoriteToggleButton productId={productId} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default ProductsList;
