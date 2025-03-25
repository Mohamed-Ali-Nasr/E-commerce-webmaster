import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";
import { IProduct } from "@/types";
import RatingProducts from "./RatingProducts";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { selectAuth } from "@/store/auth/authSlice";
import { selectCart, setNumOfItems } from "@/store/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useAddToCartMutation,
  useAddToWishlistMutation,
  useGetUserCartQuery,
  useGetUserWishlistQuery,
  useRemoveFromWishlistMutation,
} from "@/store/cart/cartApi";
import { toast } from "react-toastify";
import { PiShoppingCartLight } from "react-icons/pi";

interface IProductProps {
  product: IProduct;
  sale?: boolean;
  explore?: boolean;
  heart?: boolean;
  allProducts?: boolean;
}

const ProductItem = ({
  product,
  sale,
  explore,
  heart,
  allProducts,
}: IProductProps) => {
  const { token } = useAppSelector(selectAuth);
  const { wishlist } = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [filtered, setFiltered] = useState<string[]>([]);

  const [addToCart] = useAddToCartMutation();
  const { refetch: refetchCart } = useGetUserCartQuery();

  const addToCartHandler = async (productId: string) => {
    if (token) {
      try {
        const data = await addToCart({ productId }).unwrap();
        dispatch(setNumOfItems(data.numOfCartItems));
        await refetchCart();
        toast.success("Product is added successfully to your Cart");
      } catch (error) {
        console.log(error);
        toast.error("Failed to add Product to your Cart");
      }
    } else {
      navigate("/signup");
    }
  };

  const [addToWishlist] = useAddToWishlistMutation();

  const { refetch: refetchWishlist } = useGetUserWishlistQuery();

  const addToWishlistHandler = async (productId: string) => {
    if (token) {
      try {
        await addToWishlist({ productId }).unwrap();
        await refetchWishlist();

        toast.success("Product added successfully to your wishlist");
      } catch (error) {
        console.log(error);
        toast.error("Failed to add Product to your wishlist");
      }
    } else {
      navigate("/signup");
    }
  };

  const [removeFromWishList] = useRemoveFromWishlistMutation();
  const removeFromWishListHandler = async (productId: string) => {
    if (token) {
      try {
        await removeFromWishList({ productId }).unwrap();
        await refetchWishlist();

        toast.success("Product removed successfully from your wishlist");
      } catch (error) {
        console.log(error);
        toast.error("Failed to remove Product from your wishlist");
      }
    } else {
      navigate("/signup");
    }
  };

  useEffect(() => {
    const filteredId = wishlist.filter((item) => item === product.id);
    setFiltered(filteredId);
  }, [product.id, wishlist]);

  return (
    <div className="select-none">
      <div className="bg-gray-100 pb-8 group relative">
        <div className="flex p-2.5 justify-between items-start">
          {sale && (
            <div className="bg-[#DB4444] rounded-sm px-3.5 py-1">
              <p className="text-gray-100">
                {Math.round(
                  ((product.price - product.priceAfterDiscount) /
                    product.price) *
                    100
                )}
                %
              </p>
            </div>
          )}

          {heart && product.priceAfterDiscount && (
            <div className="bg-[#DB4444] rounded-sm px-3.5 py-1">
              <p className="text-gray-100">
                {Math.round(
                  ((product.price - product.priceAfterDiscount) /
                    product.price) *
                    100
                )}
                %
              </p>
            </div>
          )}

          {allProducts && product.priceAfterDiscount && (
            <div className="bg-[#DB4444] rounded-sm px-3.5 py-1">
              <p className="text-gray-100">
                {Math.round(
                  ((product.price - product.priceAfterDiscount) /
                    product.price) *
                    100
                )}
                %
              </p>
            </div>
          )}

          {product.isNew && (
            <div className="bg-[#00FF66] rounded-sm px-3.5 py-1">
              <p className="text-gray-100">New</p>
            </div>
          )}

          <div className="flex flex-col gap-2 items-end flex-1">
            {filtered.length > 0 ? (
              filtered.map((i) => (
                <div
                  className={`bg-white rounded-full cursor-pointer p-2 hover:text-white hover:bg-gray-500 transition-all duration-300 ${
                    heart ? "hidden" : ""
                  }`}
                  onClick={() => removeFromWishListHandler(product.id)}
                  key={i}
                >
                  <GoHeartFill size={25} />
                </div>
              ))
            ) : (
              <div
                className={`bg-white rounded-full cursor-pointer p-2 hover:text-white hover:bg-gray-500 transition-all duration-300 ${
                  heart ? "hidden" : ""
                }`}
              >
                <GoHeart
                  size={25}
                  onClick={() => addToWishlistHandler(product.id)}
                />
              </div>
            )}

            <Link
              to={`/products/${product.id}`}
              className="bg-white rounded-full cursor-pointer p-2 hover:text-white hover:bg-gray-500 transition-all duration-300"
            >
              <IoEyeOutline size={25} />
            </Link>
          </div>
        </div>
        <div className="pb-8">
          <img
            src={product.imageCover}
            className="h-[220px] sm:h-[200px] object-contain mx-auto p-1"
            alt={product.title}
          />
        </div>

        {heart ? (
          <div
            className="hover:bg-gray-600 focus:ring-gray-300 whitespace-nowrap w-full px-4 py-2.5 font-semibold text-center text-white transition-all duration-500 bg-gray-900 rounded-b-sm cursor-pointer absolute bottom-0 flex items-center justify-center gap-4"
            onClick={() => addToCartHandler(product.id)}
          >
            <PiShoppingCartLight size={25} />
            <p> Add to Cart</p>
          </div>
        ) : (
          <button
            className="hover:bg-gray-600 focus:ring-gray-300 group-hover:opacity-100 group-hover:translate-y-0 whitespace-nowrap w-full px-4 py-2.5 mx-auto font-semibold text-center text-white transition-all duration-500 translate-y-full bg-gray-900 rounded-sm opacity-0 cursor-pointer absolute bottom-0"
            onClick={() => addToCartHandler(product.id)}
          >
            Add to Cart
          </button>
        )}
      </div>

      <div className="mt-4">
        <p className="text-gray-700 text-[18px] font-semibold">
          {product.title.split(" ").slice(0, 4).join(" ")}
        </p>

        {explore ? (
          <div className="flex gap-6">
            <span className="text-[#DB4444] text-xl font-semibold mt-4 block">
              {`$${product.price}`}
            </span>
            <RatingProducts product={product} />
          </div>
        ) : (
          <>
            {product.priceAfterDiscount ? (
              <div className="mt-4 flex gap-4">
                <span className="text-[#DB4444] font-semibold">
                  ${product.priceAfterDiscount}
                </span>
                <span className="text-gray-500 line-through">
                  ${product.price}
                </span>
              </div>
            ) : (
              <span className="text-[#DB4444] font-semibold mt-4 block">
                {`$${product.price}`}
              </span>
            )}

            <RatingProducts product={product} />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
