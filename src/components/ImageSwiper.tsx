import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import { apple, hero } from "@/assets";
import { Link } from "react-router-dom";

const ImageSwiper = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      speed={1000}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
    >
      {[...Array(5)].map((_, i) => (
        <SwiperSlide key={i}>
          <div className="bg-black text-white flex flex-col md:flex-row mx-6 items-center p-8 mb-4 relative transition-opacity duration-1000">
            <div className="md:w-1/2 space-y-4 px-4 xl:px-16 pb-10 opacity-0 transition-opacity duration-1000 [.swiper-slide-active_&]:opacity-100">
              <div className="flex items-center space-x-2 mb-6">
                <img src={apple} className="pr-4" alt="Apple Logo" />
                <span className="text-[18px]">iPhone 14 Series</span>
              </div>
              <h2 className="lg:text-[50px] leading-16 text-4xl w-[200px] font-medium lg:w-[300px]">
                Up to 10% off Voucher
              </h2>
              <Link
                to="/ProductPage"
                className="text-white flex items-center gap-3"
              >
                <span className="border-b text-[18px] inline-block pb-1">
                  Shop Now
                </span>
                <HiOutlineArrowSmallRight size={30} />
              </Link>
            </div>
            <img
              src={hero}
              className="md:w-1/2 object-contain opacity-0 transition-opacity duration-1000 [.swiper-slide-active_&]:opacity-100"
              alt="iPhone"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSwiper;
