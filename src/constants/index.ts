import { MdOutlinePhoneIphone } from "react-icons/md";
import {
  HiOutlineComputerDesktop,
  HiOutlineShoppingBag,
} from "react-icons/hi2";
import { TbDeviceWatchStats } from "react-icons/tb";
import { PiCamera, PiHeadphonesLight } from "react-icons/pi";
import { VscGame } from "react-icons/vsc";
import { AiOutlineShop } from "react-icons/ai";
import { CiDollar } from "react-icons/ci";
import { LiaCommentDollarSolid } from "react-icons/lia";
import { staff_1, staff_2, staff_3 } from "@/assets";
import { RiTwitterLine, RiInstagramLine, RiLinkedinLine } from "react-icons/ri";

export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Contact",
    route: "/contact",
  },
  {
    label: "About",
    route: "/about",
  },
  {
    label: "Sign Up",
    route: "/signup",
  },
];

export const ctegoriesArray = [
  {
    label: "Phones",
    Icon: MdOutlinePhoneIphone,
  },
  {
    label: "Computers",
    Icon: HiOutlineComputerDesktop,
  },
  {
    label: "SmartWatch",
    Icon: TbDeviceWatchStats,
  },
  {
    label: "Camera",
    Icon: PiCamera,
  },
  {
    label: "Headphones",
    Icon: PiHeadphonesLight,
  },
  {
    label: "Gaming",
    Icon: VscGame,
  },
];

export const aboutArray = [
  {
    label: "Sallers active our site",
    number: 10.5,
    Icon: AiOutlineShop,
  },
  {
    label: "Monthly Product Sale",
    number: 33,
    Icon: CiDollar,
  },
  {
    label: "Customer active in our site",
    number: 45.5,
    Icon: HiOutlineShoppingBag,
  },
  {
    label: "Annual gross sale in our site",
    number: 25,
    Icon: LiaCommentDollarSolid,
  },
];

export const staffArray = [
  {
    name: "Tom Cruise",
    position: "Founder & Chairman",
    image: staff_1,
    socials: [
      { Icon: RiTwitterLine, link: "#" },
      { Icon: RiInstagramLine, link: "#" },
      { Icon: RiLinkedinLine, link: "#" },
    ],
  },
  {
    name: "Emma Watson",
    position: "Managing Director",
    image: staff_2,
    socials: [
      { Icon: RiTwitterLine, link: "#" },
      { Icon: RiInstagramLine, link: "#" },
      { Icon: RiLinkedinLine, link: "#" },
    ],
  },
  {
    name: "Will Smith",
    position: "Product Designer",
    image: staff_3,
    socials: [
      { Icon: RiTwitterLine, link: "#" },
      { Icon: RiInstagramLine, link: "#" },
      { Icon: RiLinkedinLine, link: "#" },
    ],
  },
  {
    name: "Tom Cruise",
    position: "Founder & Chairman",
    image: staff_1,
    socials: [
      { Icon: RiTwitterLine, link: "#" },
      { Icon: RiInstagramLine, link: "#" },
      { Icon: RiLinkedinLine, link: "#" },
    ],
  },
  {
    name: "Emma Watson",
    position: "Managing Director",
    image: staff_2,
    socials: [
      { Icon: RiTwitterLine, link: "#" },
      { Icon: RiInstagramLine, link: "#" },
      { Icon: RiLinkedinLine, link: "#" },
    ],
  },
];
