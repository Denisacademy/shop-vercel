"use client";
import { useEffect, useState } from "react";
import { createReviewAction, findExistingReview } from "@/utils/actions";
import SubmitButton from "../form/Buttons";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import RatingInput from "./RatingInput";
import FormContainer from "../form/FormContainer";
import TextAreaInput from "../form/TextAreaInput";
import { useUser } from "@clerk/nextjs";

function SubmitReview({ productId }: { productId: string }) {
  const [isReviewVisible, setIsReviewVisible] = useState(false);
  // const [isReviewExist, setIsReviewExist] = useState<any>();
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUser();

  // useEffect(() => {
  //   const getReview = async (productId: string) => {
  //     setIsLoading(true);
  //     const review = await findExistingReview(productId);
  //     setIsReviewExist(review);
  //     setIsLoading(false);
  //   };
  //   getReview(productId);
  // }, []);

  // console.log(isReviewExist);

  // if (isLoading) return <h2>Loading...</h2>;
  return (
    <div>
      {/* {!isReviewExist ? ( */}
      <div className="mb-4">
        <Button onClick={() => setIsReviewVisible((prev) => !prev)} size="lg">
          Leave Review
        </Button>
      </div>
      {/* ) : null} */}
      {isReviewVisible && (
        <Card className="p-8 mt-8">
          <FormContainer action={createReviewAction}>
            <input type="hidden" name="productId" value={productId} />
            {/* USER */}
            <input type="hidden" name="authorName" value={user?.firstName || "user"} />
            <input type="hidden" name="authorImageUrl" value={user?.imageUrl || ""} />

            <RatingInput name="rating" />
            <TextAreaInput name="comment" defaultValue="Awesome!!!" labelText="feedback" />
            <SubmitButton className="mt-4" text="Submit" />
          </FormContainer>
        </Card>
      )}
    </div>
  );
}

export default SubmitReview;
