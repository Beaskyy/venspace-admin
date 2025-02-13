"use client";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import token from "@/lib/access-token";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  // useEffect(() => {
  //   if (!token) {
  //     router.replace("/login");
  //   }
  // });

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setScreenSize(currentWidth);

      if (currentWidth > 900 && !activeMenu) {
        setActiveMenu(true); // Reopen the menu if the width exceeds 900
      } else if (currentWidth <= 900 && activeMenu) {
        setActiveMenu(false); // Close the menu if the width is less than or equal to 900
      }
    };

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Initial check to handle screen size on first render
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeMenu]);

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  return (
    <main>
      <div
        className="flex relative"
        onClick={() => {
          if (activeMenu) {
            handleCloseSidebar();
          }
        }}
      >
        {activeMenu && (
          <div className="w-[256px] fixed z-50 left-0">
            <Sidebar />
          </div>
        )}
        <div
          className={`min-h-screen w-full ${
            activeMenu ? "md:ml-64" : "flex-2"
          }`}
        >
          <div className="fixed md:static w-full z-20">
            <Header />
          </div>
        </div>
        <div
          className={`absolute top-20 transition-all duration-300 ${
            activeMenu
              ? "md:w-[calc(100%-256px)] w-full overflow-hidden md:left-[256px]"
              : "w-full md:left-0"
          }`}
        >
          {children}
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
