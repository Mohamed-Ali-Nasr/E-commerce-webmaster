import { useState, useEffect } from "react";
import {
  useAddToCartMutation,
  useAddToWishlistMutation,
  useGetAllProductsQuery,
  useGetProductDetailsQuery,
  useGetUserCartQuery,
  useGetUserWishlistQuery,
  useRemoveFromWishlistMutation,
  useUpdateQuantityMutation,
} from "@/store/cart/cartApi";
import { selectCart, setNumOfItems, setUserCart } from "@/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import RatingProducts from "@/components/RatingProducts";
import { toast } from "react-toastify";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import Loader from "@/components/Loader";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { TbTruckDelivery, TbTruckReturn } from "react-icons/tb";
import ProductItem from "@/components/ProductItem";
import { IProduct } from "@/types";
import { getRandomItems } from "@/utils";

const ProductDetails = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [selectColor, setSelectColor] = useState("");
  const [countProduct, setCountProduct] = useState(1);
  const [filtered, setFiltered] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { productDetails, wishlist, userCart, products } =
    useAppSelector(selectCart);

  const [addToCart] = useAddToCartMutation();
  const { refetch: refetchCart } = useGetUserCartQuery();

  const addToCartHandler = async (productId: string) => {
    try {
      const data = await addToCart({ productId }).unwrap();
      dispatch(setNumOfItems(data.numOfCartItems));
      await refetchCart();
      toast.success("Product is added successfully to your Cart");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add Product to your Cart");
    }
  };

  const { isError: productError, isLoading: productLoading } =
    useGetProductDetailsQuery(id!);

  const [updateQuantity] = useUpdateQuantityMutation();

  const updateQuantityHandler = async ({
    productId,
    count,
  }: {
    productId: string;
    count: number;
  }) => {
    try {
      const data = await updateQuantity({
        productId,
        count,
      }).unwrap();
      dispatch(setUserCart(data));
      dispatch(setNumOfItems(data.numOfCartItems));
      toast.success("Product is updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to updated Product");
    }
  };

  const [addToWishlist] = useAddToWishlistMutation();

  const { refetch: refetchWishlist } = useGetUserWishlistQuery();

  const addToWishlistHandler = async (productId: string) => {
    try {
      await addToWishlist({ productId }).unwrap();
      await refetchWishlist();

      toast.success("Product added successfully to your wishlist");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add Product to your wishlist");
    }
  };

  const [removeFromWishList] = useRemoveFromWishlistMutation();
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

  useEffect(() => {
    const filteredId = wishlist.filter((item) => item === id);
    setFiltered(filteredId);
  }, [id, wishlist]);

  useEffect(() => {
    if (userCart) {
      userCart?.data.products.forEach((product) => {
        if (product.product.id === id) {
          setCountProduct(product.count);
        }
      });
    }
  }, [id, userCart]);

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

  if (productLoading || productsLoading) {
    return <Loader />;
  }

  return (
    <section className="md:px-6 lg:px-8 px-4 mt-6 mx-auto container py-12">
      {productError && (
        <p className="my-12 text-4xl font-semibold text-red-500">
          Something Wrong happened, Please Try again Later ...
        </p>
      )}

      {productDetails && (
        <>
          <div className="flex items-center gap-2.5 mb-10 pb-10 pt-4 flex-wrap">
            <p className="text-gray-500">Account</p>
            <span className="text-gray-500">/</span>
            <p className="text-gray-500">{productDetails?.category.name}</p>
            <span className="text-gray-500">/</span>
            <h4 className="font-medium">
              {productDetails?.title.split(" ").slice(0, 4).join(" ")}
            </h4>
          </div>

          <div className="grid lg:grid-cols-3 grid-cols-1 gap-20 lg:gap-2 mb-20 pb-20">
            <div className="flex flex-col md:flex-row gap-4 lg:col-span-2 sm:px-2">
              <div className="h-[80px] sm:h-[100px] md:h-[670px] md:w-[150px] order-2 md:order-1">
                {/* Thumbnail Slider */}
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={4}
                  watchSlidesProgress
                  modules={[Thumbs]}
                  direction="horizontal"
                  breakpoints={{
                    768: {
                      direction: "vertical",
                    },
                  }}
                  className="h-full"
                >
                  {productDetails?.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image}
                        className="w-full h-full object-cover cursor-pointer rounded-lg opacity-50 transition-opacity hover:opacity-100 [.swiper-slide-thumb-active_&]:opacity-100"
                        alt={`Thumbnail ${index + 1}`}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="md:w-[400px] h-[500px] md:h-auto order-1 md:order-2">
                {/* Main Slider */}
                <Swiper
                  spaceBetween={5}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[Thumbs]}
                  className="h-full"
                >
                  {productDetails?.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image}
                        className="w-full h-full object-cover cursor-pointer rounded-lg"
                        alt={`Main ${index + 1}`}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <div>
              <h2 className="xl:text-3xl text-2xl font-semibold whitespace-nowrap">
                {productDetails?.title.split(" ").slice(0, 4).join(" ")}
              </h2>

              <div className="flex items-center my-2 gap-2.5">
                <RatingProducts product={productDetails} details />
                <span className="text-gray-500 mt-3">/</span>
                <p className="text-[#00FF66] mt-3">In Stock</p>
              </div>

              {productDetails.priceAfterDiscount ? (
                <div className="flex gap-4 text-3xl font-semibold my-4">
                  <span className="text-[#DB4444]">
                    ${productDetails.priceAfterDiscount.toFixed(2)}
                  </span>
                  <span className="text-gray-500 line-through">
                    ${productDetails.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-semibold my-4 block">
                  {`$${productDetails.price.toFixed(2)}`}
                </span>
              )}

              <p className="text-lg max-w-md my-4 pt-4 pb-8 border-b-2 border-gray-400">
                PlayStation 5 Controller Skin High quality vinyl with air
                channel adhesive for easy bubble free install & mess free
                removal Pressure sensitive.
              </p>

              <div className="flex items-center gap-6 mt-4">
                <h5 className="text-xl">colours:</h5>
                <div className="flex gap-2">
                  <input
                    id="primary"
                    type="radio"
                    onChange={() => {
                      setSelectColor("primary");
                    }}
                    checked={selectColor === "primary"}
                    className="h-5 w-5 appearance-none bg-[#a0bce0] rounded-full checked:border-2 cursor-pointer"
                  />

                  <input
                    id="secondary"
                    type="radio"
                    onChange={() => {
                      setSelectColor("secondary");
                    }}
                    checked={selectColor === "secondary"}
                    className="h-5 w-5 appearance-none bg-[#e07575] rounded-full checked:border-2 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 mt-4">
                <h5 className="text-xl">Size:</h5>
                <ul className="flex gap-3">
                  <li className="border-gray-400 border-2 rounded-lg w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444] transition-all duration-300">
                    XS
                  </li>
                  <li className="border-gray-400 border-2 rounded-lg w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444] transition-all duration-300">
                    S
                  </li>
                  <li className="border-gray-400 border-2 rounded-lg w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444] transition-all duration-300">
                    M
                  </li>
                  <li className="border-gray-400 border-2 rounded-lg w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444] transition-all duration-300">
                    L
                  </li>
                  <li className="border-gray-400 border-2 rounded-lg w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444] transition-all duration-300">
                    XL
                  </li>
                </ul>
              </div>

              <div className="flex gap-4 mt-6">
                <div className="flex items-center w-[150px] h-[40px]">
                  <div
                    className="border-2 h-full rounded-tl-sm rounded-bl-sm border-gray-400 flex items-center justify-center cursor-pointer hover:bg-[#DB4444] hover:border-[#DB4444] hover:text-white transition-all duration-300 w-1/4"
                    onClick={() => {
                      if (countProduct <= 1) {
                        return;
                      } else {
                        updateQuantityHandler({
                          productId: productDetails.id,
                          count: countProduct - 1,
                        });
                      }
                    }}
                  >
                    <HiOutlineMinus size={18} />
                  </div>
                  <div className="border-y-2 h-full border-gray-400 flex text-lg font-medium items-center justify-center w-1/2">
                    {countProduct}
                  </div>
                  <div
                    className="border-2 h-full rounded-tr-sm rounded-br-sm border-gray-400 flex items-center justify-center cursor-pointer hover:bg-[#DB4444] hover:border-[#DB4444] hover:text-white transition-all duration-300 w-1/4"
                    onClick={() => {
                      updateQuantityHandler({
                        productId: productDetails.id,
                        count: countProduct + 1,
                      });
                    }}
                  >
                    <HiOutlinePlus size={18} />
                  </div>
                </div>

                <div
                  onClick={() => {
                    addToCartHandler(id!);
                  }}
                >
                  <button className="hover:bg-red-700 transition-all duration-300 cursor-pointer bg-[#DB4444] xl:text-lg lg:text-sm font-medium text-white rounded-sm tracking-wide h-[40px] px-4 lg:px-3 xl:px-8">
                    Buy Now
                  </button>
                </div>

                {filtered.length > 0 ? (
                  filtered.map((i) => (
                    <div
                      className="border-gray-400 border-2 rounded-lg w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444] transition-all duration-300"
                      onClick={() => removeFromWishListHandler(id!)}
                      key={i}
                    >
                      <GoHeartFill size={25} />
                    </div>
                  ))
                ) : (
                  <div className="border-gray-400 border-2 rounded-lg w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444] transition-all duration-300">
                    <GoHeart
                      size={25}
                      onClick={() => addToWishlistHandler(id!)}
                    />
                  </div>
                )}
              </div>

              <div className="mt-8 border-2 border-gray-400 max-w-[400px] xl:w-[400px] lg:w-[340px]">
                <div className="flex items-center gap-4 border-b-2 border-b-gray-400 pl-4 py-6">
                  <TbTruckDelivery size={35} />
                  <div className="flex flex-col gap-1 font-medium">
                    <p>Free Delivery</p>
                    <a
                      className="underline xl:text-sm text-xs font-medium sm:whitespace-nowrap"
                      href="#"
                    >
                      Enter your postal code for Delivery Availability
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 pl-4 py-6">
                  <TbTruckReturn size={35} />
                  <div className="flex flex-col gap-1 font-medium">
                    <p>Return Delivery</p>
                    <div className="text-sm">
                      Free 30 Days Delivery Returns
                      <a className="underline font-medium ml-2" href="#">
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <div className="flex items-center gap-4 mb-16">
              <div className="bg-[#DB4444] w-5 h-10 rounded-sm"></div>
              <p className="text-lg text-[#DB4444] font-semibold">
                Related Item
              </p>
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
                      <ProductItem product={product} allProducts />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ProductDetails;
