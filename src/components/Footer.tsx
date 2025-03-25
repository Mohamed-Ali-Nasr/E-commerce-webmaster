import { vector, appStore, googlePlay, qrCode } from "@/assets";
import {
  RiFacebookLine,
  RiTwitterLine,
  RiInstagramLine,
  RiLinkedinLine,
} from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container md:px-6 lg:px-8 px-4 mx-auto mt-10">
        <div className="md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 md:gap-8 grid grid-cols-1">
          <div className="mb-12 flex flex-col items-center md:items-start">
            <h5 className="text-3xl font-bold tracking-widest mb-8">
              Exclusive
            </h5>
            <p className="font-medium text-2xl mb-8">Subscribe</p>
            <p className="mb-4">Get 10% off your first order</p>
            <div className="!relative mt-3 w-full flex flex-col items-center md:items-start">
              <input
                type="text"
                placeholder="Enter your email"
                className="border border-white rounded-sm py-2.5 px-4 pr-14 sm:w-52 w-full"
              />
              <div className="!absolute -translate-y-1/2 top-1/2 right-[5%] sm:right-[35%] md:right-[45%] lg:right-[35%] xl:right-[14%] 2xl:right-[28%] cursor-pointer border-none bg-transparent">
                <img src={vector} alt="Arrow" className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="mb-12 flex flex-col items-center md:items-start">
            <h5 className="text-2xl mb-8 font-medium">Support</h5>
            <p className="mb-6 w-48">
              111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
            </p>
            <p className="mb-6">exclusive@gmail.com</p>
            <p className="mb-6">+88015-88888-9999</p>
          </div>

          <div className="mb-12 flex flex-col items-center md:items-start">
            <h5 className="text-2xl mb-8 font-medium">Account</h5>
            <ul>
              <li className="mb-3">
                <a href="#">My Account</a>
              </li>
              <li className="mb-3">
                <a href="#">Login / Register</a>
              </li>
              <li className="mb-3">
                <a href="#">Cart</a>
              </li>
              <li className="mb-3">
                <a href="#">Wishlist</a>
              </li>
              <li className="mb-3">
                <a href="#">Shop</a>
              </li>
            </ul>
          </div>

          <div className="mb-12 flex flex-col items-center md:items-start">
            <h5 className="text-2xl mb-8 font-medium">Quick Link</h5>
            <ul>
              <li className="mb-3">
                <a href="#">Privacy Policy</a>
              </li>
              <li className="mb-3">
                <a href="#">Terms Of Use</a>
              </li>
              <li className="mb-3">
                <a href="#">FAQ</a>
              </li>
              <li className="mb-3">
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          <div className="mb-12 flex flex-col items-center md:items-start">
            <h5 className="text-2xl mb-8 font-medium">Download App</h5>
            <p className="text-[12px] text-gray-300 mb-3">
              Save $3 With App & New User Only
            </p>

            <div className="flex items-center">
              <div className="me-2">
                <img src={qrCode} alt="QR Code" />
              </div>
              <div className="flex flex-col">
                <a href="#">
                  <img src={googlePlay} alt="Google Play" />
                </a>
                <a href="#" className="mb-2">
                  <img src={appStore} alt="App Store" />
                </a>
              </div>
            </div>

            <div className="flex mt-8 gap-6">
              <a
                href="#"
                className="hover:-translate-y-1 duration-300 transition-all"
              >
                <RiFacebookLine size={25} />
              </a>
              <a
                href="#"
                className="hover:-translate-y-1 duration-300 transition-all"
              >
                <RiTwitterLine size={25} />
              </a>
              <a
                href="#"
                className="hover:-translate-y-1 duration-300 transition-all"
              >
                <RiInstagramLine size={25} />
              </a>
              <a
                href="#"
                className="hover:-translate-y-1 duration-300 transition-all"
              >
                <RiLinkedinLine size={25} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 mx-auto">
        <p className="text-gray-500">
          &copy; Copyright Rimel 2022. All right reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
