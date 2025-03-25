import { about } from "@/assets";
import AboutCounter from "@/components/AboutCounter";
import { aboutArray, staffArray } from "@/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { TbTruckDelivery } from "react-icons/tb";
import { SlEarphonesAlt } from "react-icons/sl";
import { RiShieldCheckLine } from "react-icons/ri";

const About = () => {
  return (
    <section className="md:my-16 my-8 pb-20">
      <div className="flex items-center gap-2.5 mb-12 container mx-auto lg:px-8 px-4">
        <p className="text-gray-500">Home</p>
        <span className="text-gray-500">/</span>
        <h4 className="font-medium">About</h4>
      </div>

      <div className="md:flex-row flex flex-col items-center mb-20 pb-16">
        <div className="mb-10 px-8 mx-auto w-full md:w-[55%] xl:w-[45%]">
          <h2 className="text-5xl font-semibold mb-12">Our Story</h2>
          <p className="mb-6 lg:w-md md:w-sm text-[18px] xl:w-lg">
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.
          </p>
          <p className="lg:w-md md:w-sm text-[18px] xl:w-lg">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>

        <div>
          <img src={about} alt="about-image" />
        </div>
      </div>

      <div className="grid lg:grid-cols-4 sm:grid-cols-2 container mx-auto xl:px-16 px-4 gap-8 mb-20">
        {aboutArray.map(({ label, number, Icon }, i) => (
          <div
            key={i}
            className="hover:bg-[#db4444] hover:text-gray-100 transition-all duration-300 cursor-pointer flex flex-col items-center gap-2 select-none border border-gray-400 py-6 xl:px-8 px-2 group"
          >
            <div className="bg-black text-white p-3 rounded-full border-12 border-[#c1c0c1] mb-4 group-hover:bg-white group-hover:text-black group-hover:border-[#e67c7c] transition-all duration-500">
              <Icon size={40} />
            </div>
            <AboutCounter targetNumber={number} />
            <p className="mt-4">{label}</p>
          </div>
        ))}
      </div>

      <div id="about" className="container mx-auto px-4 mb-20">
        <Swiper
          modules={[Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          speed={1000}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            // Responsive breakpoints
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {staffArray.map(({ name, image, position, socials }, i) => (
            <SwiperSlide key={i}>
              <div className="select-none py-12 flex flex-col items-center">
                <div className="flex flex-col gap-6">
                  <img src={image} alt={name} />
                  <div className="pb-4">
                    <h3 className="text-3xl font-semibold mb-2 tracking-wider">
                      {name}
                    </h3>
                    <p className="mb-4">{position}</p>
                    <div className="flex gap-4">
                      {socials.map(({ Icon, link }, i) => (
                        <a
                          key={i}
                          href={link}
                          className="hover:text-[#db4444] transition-all duration-300"
                        >
                          <Icon size={24} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex sm:flex-row sm:flex-wrap flex-col justify-evenly items-center mt-20 pt-16 gap-8">
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
    </section>
  );
};

export default About;
