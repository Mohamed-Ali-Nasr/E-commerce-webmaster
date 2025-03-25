import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdKeyboardArrowDown, MdOutlineCancel } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { GoHeart } from "react-icons/go";
import { PiShoppingCartLight } from "react-icons/pi";
import NavItems from "./NavItems";
import { LiaBarsSolid } from "react-icons/lia";
import { RiUser3Line } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { selectAuth, logout } from "@/store/auth/authSlice";
import {
  selectCart,
  setCountWishlist,
  setNumOfItems,
  setWishList,
} from "@/store/cart/cartSlice";
import { FiShoppingBag } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isView, setIsView] = useState(false);

  const { token } = useAppSelector(selectAuth);
  const { numOfItems, countWishlist } = useAppSelector(selectCart);

  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setNumOfItems(0));
    dispatch(setCountWishlist(0));
    dispatch(setWishList([]));
  };

  useEffect(() => {
    document.addEventListener("click", () => {
      setIsView(false);
      setIsOpen(false);
    });

    return () => {
      document.removeEventListener("click", () => {
        setIsView(false);
        setIsOpen(false);
      });
    };
  });

  return (
    <nav className="w-full select-none shadow-sm">
      <div className="bg-black text-[#fafafa] hidden h-12 md:flex justify-between lg:justify-center items-center">
        <div className="flex gap-2 text-sm font-medium">
          <p className="p-1">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </p>
          <Link to="/" className="underline p-1">
            ShopNow
          </Link>
        </div>

        <div className="absolute right-8 flex items-center gap-1.5 p-1">
          <span>English</span>
          <MdKeyboardArrowDown size={25} className="cursor-pointer" />
        </div>
      </div>

      <div className="border-b border-b-gray-400">
        <div className="md:px-6 lg:px-8 px-4 mx-auto mt-6 container">
          <div className="relative flex items-center justify-between h-16">
            <div>
              <Link to="/">
                <h1 className="text-3xl font-bold tracking-widest">
                  Exclusive
                </h1>
              </Link>
            </div>

            <div className="lg:block lg:ml-10 hidden">
              <div className="flex xl:space-x-2">
                {" "}
                <NavItems setIsOpen={setIsOpen} />
              </div>
            </div>

            <div
              className="flex items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {pathname.startsWith("/sign") ? (
                <div className="sm:flex bg-[#F5F5F5] rounded-lg items-center p-1 mr-6 hidden">
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="h-[35px] border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2 flex-1 placeholder:text-xs caret-zinc-500"
                  />
                  <CiSearch size={25} className="cursor-pointer" />
                </div>
              ) : token ? (
                <>
                  <div className="md:flex bg-[#F5F5F5] rounded-lg items-center p-1 mr-4 hidden">
                    <input
                      type="text"
                      placeholder="What are you looking for?"
                      className="h-[35px] border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2 flex-1 placeholder:text-xs caret-zinc-500"
                    />
                    <CiSearch size={25} className="cursor-pointer" />
                  </div>

                  <Link to="/wishlist" className="relative px-1 pt-2">
                    <GoHeart className="sm:mr-4 w-7 h-7 sm:w-8 sm:h-8" />

                    <span className="rounded-lg sm:px-[5px] px-1 py-0.5 sm:py-[3px] text-[9px] -left-0.5 top-1 absolute bg-[#DB4444] text-white">
                      {countWishlist > 0 ? countWishlist : 0}
                    </span>
                  </Link>

                  <Link to="/cart" className="relative px-1 pt-2">
                    <PiShoppingCartLight className="sm:mr-3 w-7 h-7 sm:w-8 sm:h-8" />

                    <span className="rounded-lg sm:px-[5px] px-1 py-0.5 sm:py-[3px] text-[9px] left-1 top-1 absolute bg-[#DB4444] text-white">
                      {numOfItems > 0 ? numOfItems : 0}
                    </span>
                  </Link>

                  <div
                    className={`relative hover:text-white p-1.5 sm:p-2 sm:mr-2 text-center hover:bg-[#DB4444] rounded-full cursor-pointer transition-all duration-300 ${
                      isView
                        ? "bg-[#DB4444] text-white"
                        : "bg-[white] text-black"
                    }`}
                    onClick={() => setIsView((prev) => !prev)}
                  >
                    <RiUser3Line className="w-6 h-6" />
                  </div>

                  {isView && (
                    <div
                      className="w-52 top-16 right-2 absolute z-10 bg-white rounded-lg shadow"
                      onClick={() => setIsView((prev) => !prev)}
                    >
                      <Link
                        to="/account"
                        className="flex gap-4 items-center px-2 my-4 hover:text-[#DB4444] transition-all duration-300"
                      >
                        <RiUser3Line size={22} />
                        <p>Manage My Account</p>
                      </Link>

                      <Link
                        to="/"
                        className="flex gap-4 items-center px-2 my-4 hover:text-[#DB4444] transition-all duration-300"
                      >
                        <FiShoppingBag size={22} />
                        <p>My Order</p>
                      </Link>

                      <Link
                        to="/"
                        className="flex gap-4 items-center px-2 my-4 hover:text-[#DB4444] transition-all duration-300"
                      >
                        <MdOutlineCancel size={22} />
                        <p>My Cancellations</p>
                      </Link>

                      <Link
                        to="/"
                        className="flex gap-4 items-center px-2 my-4 hover:text-[#DB4444] transition-all duration-300"
                      >
                        <FaRegStar size={22} />
                        <p>My Reviews</p>
                      </Link>

                      <div
                        onClick={handleLogout}
                        className="flex gap-4 items-center px-2 my-4 hover:text-[#DB4444] transition-all duration-300 cursor-pointer"
                      >
                        <TbLogout2 size={22} />
                        <p>Logout</p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="sm:flex bg-[#F5F5F5] rounded-lg items-center p-1 mr-6 hidden">
                    <input
                      type="text"
                      placeholder="What are you looking for?"
                      className="h-[35px] border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2 flex-1 placeholder:text-xs caret-zinc-500"
                    />
                    <CiSearch size={25} className="cursor-pointer" />
                  </div>

                  <Link to="/wishlist" className="relative">
                    <GoHeart size={30} className="sm:mr-4 mr-2" />
                  </Link>

                  <Link to="/cart" className="relative">
                    <PiShoppingCartLight size={35} className="sm:mr-4 mr-2" />
                  </Link>
                </>
              )}

              <div
                onClick={() => setIsOpen((prev) => !prev)}
                className="p-1 rounded-md border lg:hidden border-gray-500 cursor-pointer ml-1"
              >
                <LiaBarsSolid className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
            </div>
          </div>
        </div>

        {/* mobile Navbar */}
        <div
          className={`transition-all duration-300 ease-in-out lg:hidden ${
            !isOpen && "hidden"
          }`}
        >
          <div className="px-2 pt-8 pb-4 space-y-5 flex flex-col sm:items-center">
            <NavItems setIsOpen={setIsOpen} isMobile />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
