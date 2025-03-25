import Loader from "@/components/Loader";
import {
  useAddToCartMutation,
  useGetAllProductsQuery,
  useGetUserWishlistQuery,
  useRemoveFromWishlistMutation,
} from "@/store/cart/cartApi";
import { selectCart, setNumOfItems } from "@/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { toast } from "react-toastify";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { RiDeleteBinLine } from "react-icons/ri";
import { PiShoppingCartLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import ProductItem from "@/components/ProductItem";
import { useEffect, useState } from "react";
import { getRandomItems } from "@/utils";
import { IProduct } from "@/types";

const Wishlist = () => {
  const { userWishlist, products } = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  const [addToCart, { isLoading: addCartLoading }] = useAddToCartMutation();

  const addToCartHandler = async (productId: string) => {
    try {
      const data = await addToCart({ productId }).unwrap();
      dispatch(setNumOfItems(data.numOfCartItems));
      toast.success("Product is added successfully to your Cart");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add Product to your Cart");
    }
  };

  const [removeFromWishList] = useRemoveFromWishlistMutation();
  const { refetch: refetchWishlist } = useGetUserWishlistQuery();

  const removeFromWishListHandler = async (productId: string) => {
    try {
      await removeFromWishList({ productId }).unwrap();
      await refetchWishlist();
      toast.success("Product removed successfully from your wishlist");
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove Product from your wishlist");
    }
  };

  const { isError: productsError, isLoading: productsLoading } =
    useGetAllProductsQuery();

  const [combinedData, setCombinedData] = useState<IProduct[]>([]);

  useEffect(() => {
    const randomSelection = getRandomItems(products, 10);

    const combined = [
      ...products.map((item) => ({ ...item, isNew: false })),
      ...randomSelection,
    ];

    // Filter out duplicates and prioritize new items
    const uniqueArray = combined.reduce((acc: IProduct[], current) => {
      const existing = acc.find((item) => item.id === current.id);
      if (!existing) {
        acc.push(current);
      } else if (current.isNew && !existing.priceAfterDiscount) {
        acc = acc.map((item) => (item.id === current.id ? current : item));
      }
      return acc;
    }, []);

    setCombinedData(uniqueArray);
  }, [products]);

  if (
    addCartLoading ||
    productsLoading ||
    !combinedData ||
    combinedData.length === 0
  ) {
    return <Loader />;
  }

  return (
    <section className="md:px-6 lg:px-8 px-4 mx-auto mt-6 container">
      <div className="pt-10 pb-6 flex justify-between items-center mb-8 gap-4">
        <h2 className="sm:text-3xl text-2xl font-semibold">
          Wishlist {userWishlist?.count ? `(${userWishlist?.count})` : ""}
        </h2>
        <button className="hover:bg-[#DB4444] transition-all duration-300 cursor-pointer block sm:text-[18px] font-medium hover:text-white sm:px-12 px-4 sm:py-4 py-2 rounded-sm border border-gray-400 hover:border-[#DB4444]">
          Move All To Bag
        </button>
      </div>

      {userWishlist?.count && userWishlist.count > 0 ? (
        <Swiper
          modules={[Navigation]}
          loop={true}
          spaceBetween={35}
          slidesPerView={1}
          breakpoints={{
            // Responsive breakpoints
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {userWishlist?.data.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="select-none">
                <div className="bg-gray-100 pb-8 relative">
                  <div className="flex p-2.5 justify-between items-start">
                    {product.priceAfterDiscount && (
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

                    <div className="flex flex-col gap-2 items-end flex-1">
                      <div
                        className="bg-white rounded-full cursor-pointer p-2 hover:text-white hover:bg-gray-500 transition-all duration-300"
                        onClick={() => removeFromWishListHandler(product.id)}
                      >
                        <RiDeleteBinLine size={25} />
                      </div>
                    </div>
                  </div>
                  <div className="pb-8">
                    <img
                      src={product.imageCover}
                      className="h-[220px] sm:h-[200px] object-contain mx-auto p-1"
                      alt={product.title}
                    />
                  </div>
                  <div
                    className="hover:bg-gray-600 focus:ring-gray-300 whitespace-nowrap w-full px-4 py-2.5 font-semibold text-center text-white transition-all duration-500 bg-gray-900 rounded-b-sm cursor-pointer absolute bottom-0 flex items-center justify-center gap-4"
                    onClick={() => addToCartHandler(product.id)}
                  >
                    <PiShoppingCartLight size={25} />
                    <p> Add to Cart</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-gray-700 text-[18px] font-semibold">
                    {product.title.split(" ").slice(0, 4).join(" ")}
                  </p>

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
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : userWishlist?.count === 0 || !userWishlist ? (
        <div className="flex flex-col items-center justify-center gap-12 py-8 my-8">
          <p className="sm:text-5xl text-3xl font-medium">
            your Wishlist Is Empty
          </p>
        </div>
      ) : (
        <></>
      )}
      <div className="mt-20">
        <div className="flex gap-4 items-center justify-between mb-16">
          <div className="flex items-center gap-4">
            <div className="bg-[#DB4444] w-5 h-10 rounded-sm"></div>
            <p className="text-[20px] font-semibold">Just For You</p>
          </div>

          <Link to="/products" className="block">
            <button className="hover:bg-[#DB4444] transition-all duration-300 cursor-pointer block sm:text-[18px] font-medium hover:text-white sm:px-12 px-4 sm:py-4 py-2 rounded-sm border border-gray-400 hover:border-[#DB4444]">
              See All
            </button>
          </Link>
        </div>

        {productsError && (
          <p className="my-12 text-4xl font-semibold text-red-500">
            Something Wrong happened, Please Try again Later ...
          </p>
        )}

        <div className="mb-40">
          {combinedData.length > 0 && (
            <Swiper
              modules={[Navigation]}
              loop={true}
              spaceBetween={35}
              slidesPerView={1}
              breakpoints={{
                // Responsive breakpoints
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
            >
              {combinedData.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductItem product={product} heart />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
