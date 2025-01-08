import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import { fetchProduct, findExistingReview } from "@/utils/actions";

import BreadCrumbs from "@/components/single-product/BreadCrumbs";
import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import AddToCart from "@/components/single-product/AddToCart";
import ProductRating from "@/components/single-product/ProductRating";
import SubmitReview from "@/components/reviews/SubmitReview";
import ProductReviews from "@/components/reviews/ProductReviews";
import { auth } from "@clerk/nextjs/server";

async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const product = await fetchProduct(params.id);
  const { image, price, name, company, description } = product;

  const productId = product.id;
  const total = formatCurrency(price);
  // console.log("ProductPage", params);
  const { userId } = auth();

  const reviewDoesNotExist = userId && !(await findExistingReview(params.id, userId));

  return (
    <section>
      <BreadCrumbs name={name} />
      <div className="mt-6 grid grid-cols-2 gap-16 mb-6">
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
      <ProductReviews productId={params.id} />
      {reviewDoesNotExist && <SubmitReview productId={params.id} />}
    </section>
  );
}

export default ProductPage;

// page[id]

// ProductReview productId={id} pathName
//     map.reviews(review =>
//       const {comment,rating, image, name} =review
//       <ReviewCard key reviewInfo={comment,rating, image, name} chidlren={DeleteReview}>
//         Rating rating={reviewInfo.rating}
//         Comment comment={reviewInfo.comment}
//           Button isVisible
//         Comment
//         <div>{chidlren}</div>
//       <ReviewCard

//     DeleteReview
//       deleteReviewAction.bind(null, {reviewId})
//       return <FormContainer action={}> -> useFormState
//         <IconButton/>
//       </FormContainer>
