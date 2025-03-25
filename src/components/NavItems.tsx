import { headerLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

interface INavItemsProps {
  isMobile?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavItems = ({ isMobile, setIsOpen }: INavItemsProps) => {
  const { pathname } = useLocation();

  return (
    <>
      {headerLinks.map(({ label, route }) => {
        const isActive = pathname === route;
        return (
          <li
            key={route}
            className={`flex items-center ${
              isMobile ? "justify-start ml-2" : "justify-center"
            }`}
          >
            <Link
              onClick={() => setIsOpen(false)}
              to={route}
              className={`mx-4 relative transition-transform duration-300 after:content-[''] after:bg-gray-400 after:absolute after:-bottom-0.5 after:left-0 after:w-full after:h-0.5 after:transition-transform after:duration-300 after:scale-x-0 after:origin-bottom-right hover:-translate-y-1 hover:after:scale-x-100 hover:after:origin-bottom-left whitespace-nowrap ${
                isActive && "font-semibold after:scale-x-100"
              } ${isMobile && "m-1 text-base"}`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default NavItems;
