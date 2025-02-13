"use client";

import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

import { useState } from "react";
import { RidersIdColumn } from "./columns";
import { Button } from "@/components/ui/button";

interface CellActionProps {
  data: RidersIdColumn;
}

export const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  return (
    <div className="cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <span className="sr-only">Open menu</span>
            <Button className="py-2.5 px-[14px] border border-[#EAECF0] h-10 bg-transparent rounded-lg text-sm text-[#344054] leading-5 hover:bg-[#f7f7f7]">
              View more
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[241px]">
          <DropdownMenuItem onClick={() => router.push(`/members/${data.id}`)}>
            <div className="flex items-center gap-2 py-1 cursor-pointer">
              <Image src="/images/view.svg" alt="eye" width={16} height={16} />
              <span className="text-sm font-normal text-black">
                View profile
              </span>
            </div>
          </DropdownMenuItem>
          {data.status === "pending" && (
            <DropdownMenuItem>
              <div className="flex items-center gap-2 py-1 cursor-pointer">
                <Check className="size-4 text-black" />
                <span className="text-sm font-normal text-black">
                  Approve member
                </span>
              </div>
            </DropdownMenuItem>
          )}
          {data.status === "approved" && (
            <DropdownMenuItem>
              <div className="flex items-center gap-2 py-1 cursor-pointer">
                <Image
                  src="/images/delete.svg"
                  alt="delete"
                  width={16}
                  height={16}
                />
                <span className="text-sm font-normal text-black">
                  Remove member
                </span>
              </div>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
