import { FaStar } from "react-icons/fa";
import RatingInput from "../reviews/RatingInput";
import { fetchProductRating } from "@/utils/actions";

async function ProductRating({ productId }: { productId: string }) {
  const { rating, count } = await fetchProductRating(productId);
  // const rating = 4.2;
  // const count = 25;
  // const avg = result._avg;
  // const count = result._count;
  // console.log(avg, count);

  const className = `flex gap-1 items-center text-md mt-1 mb-4`;
  const countValue = `(${count}) reviews`;
  return (
    <>
      <span className={className}>
        <FaStar className="w-3 h-3" />
        {rating}
        {countValue}
      </span>
    </>
  );
}

export default ProductRating;
