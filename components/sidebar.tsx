import { links } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const Sidebar = () => {
  const pathname = usePathname();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <div className="w-[256px] bg-white border-r border-[#1A1A1A14] h-screen fixed flex flex-col p-6">
      <div className="pb-2">
          <Link href="/profile" className="relative flex gap-3 items-center md:w-12 md:h-12 w-6 h-6">
            <Image
              src="/logo.svg"
              alt="logo"
              fill
              className="absolute"
            />
          </Link>
      </div>
      <nav className="flex flex-col gap-2 mt-4 lg:overflow-hidden overflow-auto lg:hover:overflow-auto whitespace-nowrap">
        {links?.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            onMouseEnter={() => setHoveredLink(link.name)} // Set hover state
            onMouseLeave={() => setHoveredLink(null)} // Clear hover state
            className={cn(
              `flex items-center gap-3 py-2.5 px-3 h-[41px] text-[#434242CC] hover:text-[#F44363] hover:bg-[#FFEBEE] text-sm font-medium rounded-lg cursor-pointer`,
              pathname === link.href && "bg-[#FFEBEE] text-[#F44363]"
            )}
          >
            <Image
              src={
                hoveredLink === link.name || pathname === link.href
                  ? link.icon2
                  : link.icon
              }
              alt={link.name}
              width={24}
              height={24}
            />
            {link.name}
          </Link>
        ))}
      </nav>
      <div className="h-0.5 bg-[#1A1A1A14] mt-6"></div>
    </div>
  );
};
