import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

function Rating({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, idx) => {
    return idx + 1 <= rating ? <FaStar className="text-primary" /> : <FaRegStar className="text-gray-400" />;
  });

  return (
    <div>
      <p className="flex">{stars.map((s) => s)}</p>
    </div>
  );
}

export default Rating;
