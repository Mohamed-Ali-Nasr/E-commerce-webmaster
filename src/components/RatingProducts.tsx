import { IProduct } from "@/types";
import { FaRegStarHalfStroke, FaRegStar, FaStar } from "react-icons/fa6";

const RatingProducts = ({
  product,
  details,
}: {
  product: IProduct;
  details?: boolean;
}) => {
  return (
    <div className="flex mt-3 items-center gap-1">
      {Array.from(
        { length: Math.floor(product.ratingsAverage) },
        (_, index) => (
          <FaStar size={16} key={`full-${index}`} className="text-[orange]" />
        )
      )}
      {product.ratingsAverage % 1 !== 0 && (
        <FaRegStarHalfStroke size={16} key="half" className="text-[orange]" />
      )}
      {Array.from(
        { length: 5 - Math.ceil(product.ratingsAverage) },
        (_, index) => (
          <FaRegStar
            size={16}
            key={`empty-${index}`}
            className="text-[orange]"
          />
        )
      )}

      {details ? (
        <span className="text-gray-500 font-medium ml-3">
          ({product.ratingsQuantity} Reviews)
        </span>
      ) : (
        <span className="text-gray-500 font-medium ml-3">
          ({product.ratingsQuantity})
        </span>
      )}
    </div>
  );
};

export default RatingProducts;
