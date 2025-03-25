import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useAppSelector } from "@/store/redux-hooks";
import { selectCart } from "@/store/cart/cartSlice";
import { useGetAllProductsQuery } from "@/store/cart/cartApi";
import Loader from "./Loader";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";
import { music } from "@/assets";

const BestSelling = () => {
  const { products } = useAppSelector(selectCart);

  const { isError: productsError, isLoading: productsLoading } =
    useGetAllProductsQuery();

  if (productsLoading) {
    return <Loader />;
  }

  return (
    <section className="py-8 px-6">
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-[#DB4444] w-5 h-10 rounded-sm"></div>
          <p className="text-[20px] font-semibold text-[#DB4444]">This Month</p>
        </div>

        <div className="flex md:flex-row flex-col gap-12 md:gap-4 md:items-center md:justify-between mb-16">
          <p className="text-5xl font-medium">Best Selling Products</p>

          <Link to="/products" className="block">
            <button className="hover:bg-red-700 transition-all duration-300 cursor-pointer bg-[#DB4444] text-[18px] font-medium text-white md:px-15 px-10 sm:py-4 py-3 rounded-md">
              View All
            </button>
          </Link>
        </div>

        {productsError && (
          <p className="my-12 text-4xl font-semibold text-red-500">
            Something Wrong happened, Please Try again Later ...
          </p>
        )}

        <div className="mb-40">
          {products.length > 0 && (
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
              {products.slice(0, 8).map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductItem product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        <div className="bg-black text-white flex gap-8 flex-col md:flex-row items-center justify-between px-8 lg:px-10 xl:px-20 xl:py-20 py-10">
          <div>
            <p className="text-[#00FF66] text-xl font-medium mb-5">
              Categories
            </p>
            <h4 className="xl:text-6xl text-3xl lg:text-5xl font-semibold my-8 lg:my-12 md:w-[250px] lg:w-[400px] xl:w-[500px]">
              Enhance Your Music Experience
            </h4>
            <CountdownTimer
              sale
              targetDate={new Date("2025-03-31T00:00:00").getTime()}
            />
            <Link to="/products" className="block mt-12">
              <button className="hover:bg-green-400 transition-all duration-300 cursor-pointer bg-[#00FF66] text-[18px] font-medium text-white md:px-15 px-10 sm:py-4 py-3 rounded-md">
                Buy Now
              </button>
            </Link>
          </div>
          <div>
            <img src={music} alt="music-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSelling;
