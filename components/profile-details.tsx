import Image from "next/image";

import { Button } from "./ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

import useSWR from "swr";
import token from "@/lib/access-token";
import { fetcher } from "@/lib/fetcher";
import { Loader, TriangleAlert } from "lucide-react";

export const ProfileDetails = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const { data, error, isLoading } = useSWR(
    [
      `${process.env.NEXT_PUBLIC_API_URL}/couriers/${user?.courier?.uuid}`,
      token,
    ],
    ([url, token]) => fetcher(url, token)
  );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center">
        <TriangleAlert className="size-5" />
        {error?.message}
      </div>
    );
  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <Loader className="size-5 animate-spin" />
      </div>
    );

  const profile = data?.data;
  console.log(profile);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="text-start">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-[#FBFBFC] p-2.5 rounded-lg">
            <Image src="/user.svg" alt="user" width={20} height={20} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-black text-[15px] font-semibold leading-[15px]">
              Profile
            </p>
            <p className="text-[#6F6F6F] text-sm leading-[14px]">
              Manage your profile details
            </p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[640px] max-h-[852px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="border-b border-[#F3F4F6] p-3 font-inter font-normal">
            <div className="flex flex-col">
              <p className="text-lg text-[#101828] font-semibold tracking-[0.1%]">
                Profile
              </p>
            </div>
          </DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-4">
              <p className="text-base text-[#F44363] font-medium">
                Company details
              </p>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-[#667085]">Company’s name</p>
                  <p className="text-base text-[#101828] font-medium">
                    {profile?.name}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-[#667085]">
                    Company’s email address
                  </p>
                  <p className="text-base text-[#101828] font-medium">
                    {profile?.email}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-[#667085]">Company’s phone</p>
                  <p className="text-base text-[#101828] font-medium">
                    {profile?.phone}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-[#667085]">Status</p>
                  <p className="text-sm bg-[#ECFDF3] py-0.5 px-2 rounded-2xl text-[#027A48] font-medium leading-[18px] w-fit">
                    Active
                  </p>
                </div>
                <div className="col-span-2 flex flex-col gap-2">
                  <p className="text-sm text-[#667085]">Company’s address</p>
                  <p className="text-base text-[#101828] font-medium">
                    {profile?.address}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-base text-[#F44363] font-medium">
                  Contact person’s details
                </p>
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-[#667085]">Name</p>
                    <p className="text-base text-[#101828] font-medium">
                      {profile?.contact_person?.first_name}{" "}
                      {profile?.contact_person?.last_name}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-[#667085]">Phone number</p>
                    <p className="text-base text-[#101828] font-medium">
                      {profile?.contact_person?.phone}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-[#667085]">NIN</p>
                    <p className="text-base text-[#101828] font-medium">
                      {profile?.contact_person?.nin}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="mt-8 bg-transparent py-2.5 px-[10] border border-[#F3F4F6] rounded-lg text-[#344054] text-sm h-10 w-20 hover:text-white hover:bg-[#5c5c5c]"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
