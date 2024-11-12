import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { LuLayoutGrid, LuList } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchAllProducts } from "@/utils/actions";
import Link from "next/link";
import { LucideLayoutGrid } from "lucide-react";

async function ProductsContainer({ layout, search }: { layout: string; search: string }) {
  const products = await fetchAllProducts({ search });
  const total = products.length;
  const searchTherm = search ? `&search=${search}` : "";

  return (
    <>
      {/* HEADER */}
      <section>
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-lg">{total} product</h4>
          <div className="flex gap-x-4">
            <Button variant={layout === "grid" ? "default" : "ghost"} asChild size="icon">
              <Link href={`/products/?layout=grid${searchTherm}`}>
                <LucideLayoutGrid />
              </Link>
            </Button>
            <Button variant={layout === "list" ? "default" : "ghost"} asChild size="icon">
              <Link href={`/products/?layout=list${searchTherm}`}>
                <LuList />
              </Link>
            </Button>
          </div>
        </div>
        <Separator className="mt-4" />
      </section>
      <div>
        {products.length === 0 && <div>nothing to show</div>}
        {layout === "grid" ? <ProductsGrid products={products} /> : <ProductsList products={products} />}
      </div>
    </>
  );
}

export default ProductsContainer;
