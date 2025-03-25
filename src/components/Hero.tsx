import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import ImageSwiper from "@/components/ImageSwiper";

const Hero = () => {
  const [openCategories, setOpenCategories] = useState({
    womensFashion: false,
    mensFashion: false,
  });

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category as keyof typeof prev],
    }));
  };

  return (
    <section className="flex flex-col md:flex-row md:gap-8 mb-20">
      {/* Left Sidebar */}
      <div className="w-full md:w-1/3 overflow-y-hidden h-[450px] md:border-r md:border-r-gray-400 py-8 px-6 pt-10 select-none">
        <div className="space-y-2 text-[18px]">
          {/* Women's Fashion */}
          <div
            className="p-1.5 cursor-pointer flex justify-between items-center hover:text-[#DB4444] transition-all duration-300"
            onClick={() => toggleCategory("womensFashion")}
          >
            <span>Womens Fashion</span>
            <FaChevronRight
              className={`transition-transform duration-300 ${
                openCategories.womensFashion ? "rotate-90" : ""
              }`}
            />
          </div>
          {openCategories.womensFashion && (
            <div className="pl-4 space-y-2">
              <div className="p-1 hover:text-[#DB4444] transition-all duration-300 cursor-pointer">
                <Link to="#">Dresses</Link>
              </div>
              <div className="p-1 hover:text-[#DB4444] transition-all duration-300 cursor-pointer">
                <Link to="#">Shoes</Link>
              </div>
              <div className="p-1 hover:text-[#DB4444] transition-all duration-300 cursor-pointer">
                <Link to="#">Accessories</Link>
              </div>
            </div>
          )}

          {/* Men's Fashion */}
          <div
            className="p-1.5 cursor-pointer flex justify-between items-center hover:text-[#DB4444] transition-all duration-300"
            onClick={() => toggleCategory("mensFashion")}
          >
            <span>Mens Fashion</span>
            <FaChevronRight
              className={`transition-transform duration-300 ${
                openCategories.mensFashion ? "rotate-90" : ""
              }`}
            />
          </div>
          {openCategories.mensFashion && (
            <div className="pl-4 space-y-2">
              <div className="p-1 hover:text-[#DB4444] transition-all duration-300 cursor-pointer">
                <Link to="#">Shirts</Link>
              </div>
              <div className="p-1 hover:text-[#DB4444] transition-all duration-300 cursor-pointer">
                <Link to="#">Pants</Link>
              </div>
              <div className="p-1 hover:text-[#DB4444] transition-all duration-300 cursor-pointer">
                <Link to="#">Shoes</Link>
              </div>
            </div>
          )}

          {/* Other Categories */}
          {[
            "Electronics",
            "Home & Lifestyle",
            "Medicine",
            "Sports & Outdoor",
            "Babys & Toys",
            "Groceries & Pets",
            "Health & Beauty",
          ].map((cat) => (
            <div
              key={cat}
              className="p-1.5 hover:text-[#DB4444] transition-all duration-300 cursor-pointer"
            >
              <Link to="#">{cat}</Link>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Swiper Card */}
      <div className="w-full md:w-2/3 mt-12" id="hero">
        <ImageSwiper />
      </div>
    </section>
  );
};

export default Hero;
