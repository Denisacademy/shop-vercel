import BreadCrumbs from "@/components/single-product/BreadCrumbs";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import AddToCart from "@/components/single-product/AddToCart";
import ProductRating from "@/components/single-product/ProductRating";
import { fetchProduct } from "@/utils/actions";

async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const product = await fetchProduct(params.id);
  const { image, price, name, company, description } = product;
  const productId = product.id;
  const total = formatCurrency(price);
  // console.log(product);
  return (
    <section>
      <BreadCrumbs name={name} />
      <div className="mt-6 grid grid-cols-2 gap-16">
        <div className="relative h-full">
          <Image
            fill
            src={image}
            alt={name}
            unoptimized
            priority
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="w-full rounded-md object-cover"
          />
        </div>
        <div>
          <div className="flex gap-x-8 items-center">
            <h1 className="capitalize font-bold text-xl">{name}</h1>
            <FavoriteToggleButton productId={productId} />
          </div>
          <ProductRating productId={productId} />
          <p className="text-xl mt-2">{company}</p>
          <p className="mt-3 rounded-md p-2 text-md bg-muted inline-block">{total}</p>
          <p className="mt-6 leading-8 text-muted-foreground">{description}</p>

          <AddToCart productId={productId} />
        </div>
      </div>
    </section>
  );
}

export default ProductPage;
