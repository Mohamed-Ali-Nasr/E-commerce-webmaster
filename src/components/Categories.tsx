import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import { NavigationOptions } from "swiper/types";
import {
  HiOutlineArrowSmallRight,
  HiOutlineArrowSmallLeft,
} from "react-icons/hi2";
import { ctegoriesArray } from "@/constants";

const Categories = () => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="py-16 px-6">
      <div className="border-b border-b-gray-300 pb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-[#DB4444] w-5 h-10 rounded-sm"></div>
          <p className="text-[20px] font-semibold text-[#DB4444]">Categories</p>
        </div>

        <div className="flex md:flex-row flex-col gap-8 md:items-center md:justify-between mb-15">
          <p className="text-3xl sm:text-5xl font-medium">Browse By Category</p>

          {swiper && (
            <div className="flex items-center gap-4">
              <button
                ref={nextRef}
                onClick={() => swiper.slideNext()}
                className="cursor-pointer p-3 bg-gray-100 rounded-full"
              >
                <HiOutlineArrowSmallLeft size={28} />
              </button>

              <button
                ref={prevRef}
                onClick={() => swiper.slidePrev()}
                className="cursor-pointer p-3 bg-gray-100 rounded-full"
              >
                <HiOutlineArrowSmallRight size={28} />
              </button>
            </div>
          )}
        </div>

        <Swiper
          modules={[Navigation]}
          loop={true}
          spaceBetween={35}
          slidesPerView={1}
          onSwiper={(swiper) => {
            setSwiper(swiper);
            if (swiper.params.navigation) {
              (swiper.params.navigation as NavigationOptions).prevEl =
                prevRef.current;
              (swiper.params.navigation as NavigationOptions).nextEl =
                nextRef.current;
            }
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            // Responsive breakpoints
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {ctegoriesArray.map(({ label, Icon }, i) => (
            <SwiperSlide key={i}>
              <div className="hover:bg-[#db4444] hover:text-gray-100 transition-all duration-300 cursor-pointer flex flex-col items-center gap-2 select-none border border-gray-400 py-6">
                <Icon size={60} />
                <div className="text-[18px] font-medium">{label}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Categories;
