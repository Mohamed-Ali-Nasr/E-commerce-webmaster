import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex-1">
        <main className="overflow-hidden">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
