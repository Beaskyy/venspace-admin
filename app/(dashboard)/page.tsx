"use client";

import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import { riders } from "@/lib/data";
import { useState } from "react";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <main>
      <div className="flex flex-col gap-[22px] md:p-9 p-5 bg-[#F5F5F5]">
        <div className="flex flex-col gap-1">
          <h3 className="text-[22px] text-[#00081E] font-semibold leading-[26.4px]">
            Welcome back, Loren 👋
          </h3>
        </div>
        <DataTable
          columns={columns}
          data={riders}
          searchKey="name"
          tableName={`Rider History`}
          tableDescription="View recent riders added"
          onPageChange={(page: number) => setCurrentPage(page)}
          currentPage={currentPage}
        />
      </div>
    </main>
  );
}
