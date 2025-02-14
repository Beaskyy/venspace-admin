import Image from "next/image";
import React from "react";

export const Overview = () => {
  return (
    <div className="flex flex-col gap-4 bg-white">
      <h4 className="text-xs text-[#434242AD] leading-[19px] tracking-[12%]">
        OVERVIEW
      </h4>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-8 md:gap-6 gap-4">
        <div className="flex flex-col gap-4 border border-[#1A1A1A14] p-4 rounded-2xl h-[110px]">
          <div className="flex items-center gap-0.5">
            <Image src="/earnings.svg" alt="earnings" width={18} height={18} />
            <p className="text-sm text-[#434242BF] font-medium whitespace-nowrap">Today’s Earnings</p>
          </div>
          <p className="text-[#001224] md:text-[32px] text-2xl font-bold">₦0.00</p>
        </div>
        <div className="flex flex-col gap-4 border border-[#1A1A1A14] p-4 rounded-2xl h-[110px]">
          <div className="flex items-center gap-0.5">
            <Image src="/earnings.svg" alt="earnings" width={18} height={18} />
            <p className="text-sm text-[#434242BF] font-medium whitespace-nowrap">Today’s Earnings</p>
          </div>
          <p className="text-[#001224] md:text-[32px] text-2xl font-bold">₦0.00</p>
        </div>
        <div className="flex flex-col gap-4 border border-[#1A1A1A14] p-4 rounded-2xl h-[110px]">
          <div className="flex items-center gap-0.5">
            <Image src="/earnings.svg" alt="earnings" width={18} height={18} />
            <p className="text-sm text-[#434242BF] font-medium whitespace-nowrap">Today’s Earnings</p>
          </div>
          <p className="text-[#001224] md:text-[32px] text-2xl font-bold">₦0.00</p>
        </div>
        <div className="flex flex-col gap-4 border border-[#1A1A1A14] p-4 rounded-2xl h-[110px]">
          <div className="flex items-center gap-0.5">
            <Image src="/earnings.svg" alt="earnings" width={18} height={18} />
            <p className="text-sm text-[#434242BF] font-medium whitespace-nowrap">Today’s Earnings</p>
          </div>
          <p className="text-[#001224] md:text-[32px] text-2xl font-bold">₦0.00</p>
        </div>
        
      </div>
    </div>
  );
};
