"use client"

import { Icons } from "@/components/icons";
import { Keys } from "@/components/keys";
import { Logout } from "@/components/logout";
import { ProfileDetails } from "@/components/profile-details";
import { Security } from "@/components/security";
import { Webhook } from "@/components/webhook";


const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <main>
      <div className="flex flex-col gap-[22px] md:p-9 p-5 bg-[#F5F5F5]">
        <div className="flex flex-col">
          <h3 className="text-[22px] text-[#00081E] font-semibold leading-[26.4px]">
            Account
          </h3>
          <h6 className="text-base text-[#475367] leading-[23.2px]">
            Checkout your account information
          </h6>
        </div>
        <div className="bg-[#00882E] py-[19px] px-4 rounded-xl">
          <div className="flex justify-between items-center gap-2.5">
            <div className="flex flex-col gap-1">
              <p className="md:text-base text-sm text-white font-semibold leading-[17.1px]">
                {user?.courier?.name}
              </p>
              <p className="md:text-sm text-xs text-white font-normal leading-[17.1px]">
              {user?.courier?.email}
              </p>
            </div>
            <div className="h-7 bg-white rounded-[32px] py-1.5 px-2.5 flex items-center">
              <div className="flex items-center gap-1">
                <Icons.BadgeCheck className="size-4" />
                <p className="text-xs text-[#4F7A64] font-semibold">
                  International
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="py-4 px-[14px] bg-white rounded-xl">
          <div className="flex flex-col gap-8">
            <ProfileDetails />
            <Security />
            <Keys />
            <Webhook />
            <Logout />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
