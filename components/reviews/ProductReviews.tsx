import { fetchProductReviews } from "@/utils/actions";
import SectionTitle from "../global/SectionTitle";

import ReviewCard from "./ReviewCard";

async function ProductReviews({ productId }: { productId: string }) {
  const reviews = await fetchProductReviews(productId);

  return (
    <div>
      <SectionTitle text="ProductReviews" />
      <div className="grid grid-cols-2 gap-4 mt-8">
        {reviews.map((review) => {
          const { comment, rating, authorImageUrl, authorName } = review;
          return (
            <ReviewCard
              key={review + authorImageUrl}
              authorImageUrl={authorImageUrl}
              authorName={authorName}
              comment={comment}
              rating={rating}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ProductReviews;
