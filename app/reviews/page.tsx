import React from "react";
import SectionTitle from "@/components/global/SectionTitle";
import { deleteReviewAction, fetchProductReviewsByUser } from "@/utils/actions";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Card } from "../../components/ui/card";
import FormContainer from "@/components/form/FormContainer";
import { IconButton } from "@/components/form/Buttons";
import ReviewCard from "@/components/reviews/ReviewCard";

async function ReviewsPage() {
  const reviews = await fetchProductReviewsByUser();
  console.log("ReviewsPage", reviews[0]);
  if (!reviews?.length) {
    return <SectionTitle text="You Have No Reviews Yet" />;
  }
  return (
    <div>
      <SectionTitle text="Your Reviews" />
      <div className="grid grid-cols-2 gap-4 mt-8">
        {reviews.map((review) => {
          const stars = Array.from({ length: review.rating }, (_, idx) => {
            return <FaStar className="text-primary" />;
          });

          return (
            <Card className="p-8 mb-4 w-full relative">
              <div className="flex gap-6 items-center mb-4">
                {/* <div className="rounded-full"> */}
                <img src={review.product.image} className="object-cover rounded-full w-[50px] h-[50px]" />
                {/* </div> */}

                <div>
                  <div className="flex gap-8 items-center">
                    <p className="capitalize font-bold mb-2">{review.product.name}</p>
                    {/* <ReviewCard> */}
                    <div className="absolute top-3 right-3">
                      <FormContainer action={deleteReviewAction.bind(null, review.id)}>
                        <IconButton actionType="delete" />
                      </FormContainer>
                    </div>
                    {/* </ReviewCard> */}
                  </div>
                  <p className="flex">
                    {stars.map((star) => (
                      <span>{star}</span>
                    ))}

                    {Array(5 - review.rating)
                      .fill("")
                      .map((_) => (
                        <FaRegStar className="text-gray-400" />
                      ))}
                  </p>
                </div>
              </div>
              <p>{review.comment}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default ReviewsPage;

//as function here in it sees action so no need to pass
const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  return (
    <div className="absolute top-3 right-3">
      <FormContainer action={deleteReviewAction.bind(null, reviewId)}>
        <IconButton actionType="delete" />
      </FormContainer>
    </div>
  );
};
