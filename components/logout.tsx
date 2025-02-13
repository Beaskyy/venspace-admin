import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import token from "@/lib/access-token";
import toast from "react-hot-toast";

export const Logout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const logout = async () => {
    setDisabled(true);
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="text-start">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-[#FBFBFC] p-2.5 rounded-lg">
            <Image src="/flash.svg" alt="flash" width={20} height={20} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-black text-[15px] font-semibold leading-[15px]">
              Logout
            </p>
            <p className="text-[#6F6F6F] text-sm leading-[14px]">
              Log out of your account
            </p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[472px]">
        <DialogHeader>
          <DialogTitle className="border-b border-[#F3F4F6] p-3 font-inter font-normal">
            <div className="flex flex-col">
              <p className="text-lg text-[#101828] font-semibold tracking-[0.1%]">
                Logout
              </p>
            </div>
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-6 pb-6">
            <p>Are you sure you want to log out of your account?</p>
            <div className="flex justify-end items-center gap-3 mt-6">
              <Button
                type="button"
                onClick={() => setIsOpen(false)}
                className="bg-transparent py-2.5 px-[10] border border-[#F3F4F6] rounded-lg text-[#344054] text-sm h-10 w-20 hover:text-white hover:bg-[#5c5c5c]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={disabled}
                onClick={logout}
                className="w-fit h-10 rounded-lg px-4 py-2.5 text-sm font-medium"
              >
                Logout
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
