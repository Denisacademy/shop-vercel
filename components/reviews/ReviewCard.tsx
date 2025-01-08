import { Card } from "../ui/card";
import Comment from "./Comment";
import Rating from "./Rating";

function ReviewCard({
  comment,
  rating,
  authorName,
  authorImageUrl,
  children,
}: {
  comment: string;
  rating: number;
  authorName: string;
  authorImageUrl: string;
  children?: React.ReactNode;
}) {
  return (
    <Card className="p-8 mb-4 w-full">
      <div className="flex gap-6 items-center mb-4">
        <img className="rounded-full" src={authorImageUrl} width="50" height="50" />

        <div>
          <p>{authorName}</p>
          <Rating rating={rating} />
        </div>
      </div>

      <Comment text={comment} />
      {/* DELETE REVIEW BUTTON IN REVIEW PAGE */}
      <div>{children}</div>
    </Card>
  );
}

export default ReviewCard;
