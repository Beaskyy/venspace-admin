import { Input } from "./ui/input";
import { AlignJustify, Bell } from "lucide-react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Navigation } from "./navigation";
import toast from "react-hot-toast";
import token from "@/lib/access-token";
import Link from "next/link";

export const Header = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const logout = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      document.cookie = "token=; Max-Age=0; Path=/;";
      window.location.href = "/login";
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="px-9 h-20 border-b border-[#F5F5F5] bg-white">
      <div className="py-3">
        <div className="flex justify-end items-center">
          <div className="md:flex hidden items-center gap-3">
              <Bell className="size-[18px]" />

            <DropdownMenu>
              <DropdownMenuTrigger className="flex justify-center items-center w-[60px] h-[52px] py-2 px-3">
                <Image src="/profile.png" alt="profile" width={36} height={36} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="md:hidden flex">
            <Navigation />
          </div>
        </div>
      </div>
    </div>
  );
};
