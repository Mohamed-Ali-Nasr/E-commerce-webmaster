import { playstation, woman, gucci, echo } from "@/assets";
import { Link } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { SlEarphonesAlt } from "react-icons/sl";
import { RiShieldCheckLine } from "react-icons/ri";
import { HiMiniArrowUp } from "react-icons/hi2";
import { useEffect, useState } from "react";

const NewArrival = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <section className="py-8 px-6">
      <div className="flex items-center gap-4 my-6">
        <div className="bg-[#DB4444] w-5 h-10 rounded-sm"></div>
        <p className="text-[20px] font-semibold text-[#DB4444]">Featured</p>
      </div>
      <p className="text-5xl font-medium mb-16">New Arrival</p>

      <div className="flex text-white lg:flex-row flex-col justify-between xl:gap-10 gap-5">
        <div className="bg-black relative px-10 rounded-sm pt-10">
          <img src={playstation} alt="playstation-5" />

          <div className="absolute bottom-8 sm:left-12 left-6 flex flex-col gap-2 mb-4">
            <h4 className="text-2xl font-semibold tracking-wider">
              PlayStation 5
            </h4>
            <p className="w-[250px] text-gray-200">
              Black and White version of the PS5 coming out on sale.
            </p>
            <Link
              to="/"
              className="block border-b w-fit border-b-gray-400 mt-2 hover:-translate-y-1 duration-300 transition-all"
            >
              Shop Now
            </Link>
          </div>
        </div>

        <div className="flex flex-col xl:gap-10 gap-5">
          <div className="bg-black relative xl:static flex items-end rounded-sm px-4 sm:px-10 pt-4 xl:pt-8">
            <div className="pb-8 absolute xl:static">
              <h4 className="text-2xl font-semibold tracking-wider mb-4">
                Women’s Collections
              </h4>
              <p className="w-[250px] text-gray-200 mb-4">
                Featured woman collections that give you another vibe.
              </p>
              <Link
                to="/"
                className="block border-b w-fit border-b-gray-400 mt-2 hover:-translate-y-1 duration-300 transition-all"
              >
                Shop Now
              </Link>
            </div>
            <div>
              <img src={woman} alt="woman-collection" />
            </div>
          </div>

          <div className="flex sm:flex-row flex-col justify-between xl:gap-10 gap-5">
            <div className="bg-black relative py-12 px-20 rounded-sm">
              <img src={echo} alt="echo-dot" />
              <div className="absolute bottom-8 xl:left-10 left-6 flex flex-col gap-2">
                <h4 className="text-2xl font-semibold tracking-wider">
                  Speakers
                </h4>
                <p className="w-[250px] text-gray-200">
                  Amazon wireless speakers{" "}
                </p>
                <Link
                  to="/"
                  className="block border-b w-fit border-b-gray-400 mt-2 hover:-translate-y-1 duration-300 transition-all"
                >
                  Shop Now
                </Link>
              </div>
            </div>

            <div className="bg-black relative py-12 px-20 rounded-sm">
              <img src={gucci} alt="gucci-bag" />
              <div className="absolute bottom-8 xl:left-10 left-6 flex flex-col gap-2">
                <h4 className="text-2xl font-semibold tracking-wider">
                  Perfume
                </h4>
                <p className="w-[250px] text-gray-200">
                  GUCCI INTENSE OUD EDP{" "}
                </p>
                <Link
                  to="/"
                  className="block border-b w-fit border-b-gray-400 mt-2 hover:-translate-y-1 duration-300 transition-all"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex sm:flex-row sm:flex-wrap flex-col justify-around items-center mt-20 mb-8 pt-16 gap-12">
        <div className="flex flex-col items-center gap-2 group mb-12">
          <div className="bg-black text-white p-3 rounded-full border-12 border-[#c1c0c1] mb-4 group-hover:bg-white group-hover:text-black group-hover:border-gray-600 transition-all duration-500">
            <TbTruckDelivery size={35} />
          </div>
          <h5 className="text-xl font-bold uppercase tracking-wider">
            FREE AND FAST DELIVERY
          </h5>
          <p className="font-medium text-gray-700">
            Free delivery for all orders over $140
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 group mb-12">
          <div className="bg-black text-white p-3 rounded-full border-12 border-[#c1c0c1] mb-4 group-hover:bg-white group-hover:text-black group-hover:border-gray-600 transition-all duration-500">
            <SlEarphonesAlt size={35} />
          </div>
          <h5 className="text-xl font-bold uppercase tracking-wider">
            24/7 CUSTOMER SERVICE
          </h5>
          <p className="font-medium text-gray-700">
            Friendly 24/7 customer support
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 group mb-12">
          <div className="bg-black text-white p-3 rounded-full border-12 border-[#c1c0c1] mb-4 group-hover:bg-white group-hover:text-black group-hover:border-gray-600 transition-all duration-500">
            <RiShieldCheckLine size={35} />
          </div>
          <h5 className="text-xl font-bold uppercase tracking-wider">
            MONEY BACK GUARANTEE
          </h5>
          <p className="font-medium text-gray-700">
            We reurn money within 30 days
          </p>
        </div>
      </div>

      <div className="fixed sm:bottom-10 bottom-4 right-4 sm:right-10 z-50">
        {isVisible && (
          <button
            onClick={scrollToTop}
            className="cursor-pointer p-3 bg-gray-100 rounded-full"
          >
            <HiMiniArrowUp size={25} />
          </button>
        )}
      </div>
    </section>
  );
};

export default NewArrival;
