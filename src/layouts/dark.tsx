import { memo } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "src/components/navbar";

const LayoutDark = memo(() => {
  return (
    <div className="w-screen min-h-screen text-[#eee] p-16">
      <Navbar />
      <div className="xl:pl-80 xl:pr-80 xl:mt-0 mt-8">
        <Outlet />
      </div>
    </div>
  );
});

LayoutDark.displayName = "LayoutDark";

export default LayoutDark;
