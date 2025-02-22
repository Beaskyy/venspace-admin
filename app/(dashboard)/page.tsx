"use client";

import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import { riders } from "@/lib/data";
import { useState } from "react";
import { Overview } from "@/components/overview";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <main>
      <div className="flex flex-col gap-[22px] md:p-9 p-5">
        <div className="flex flex-col gap-1">
          <h3 className="md:text-[22px] text-lg text-[#001224] font-bold leading-[29.1px]">
            Welcome back, Loren 👋
          </h3>
        </div>
        <Overview />
        <DataTable
          columns={columns}
          data={riders}
          searchKey="name"
          tableName={`Listings`}
          tableDescription="View recent listings"
          onPageChange={(page: number) => setCurrentPage(page)}
          currentPage={currentPage}
        />
      </div>
    </main>
  );
}
