"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUp } from "lucide-react";
import { CellAction } from "./cell-action";
import Image from "next/image";

export type RidersIdColumn = {
  id: number;
  name: string;
  plate_number: string;
  vehicle_type: string;
  status: string;
  created_at: string;
};

export const columns: ColumnDef<RidersIdColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 cursor-pointer"
        >
          Rider’s name
        </div>
      );
    },
  },
  {
    accessorKey: "plate_number",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 cursor-pointer"
        >
          Vehicle plate number
        </div>
      );
    },
  },
  {
    accessorKey: "vehicle_type",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 cursor-pointer"
        >
          Vehicle type
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 cursor-pointer"
        >
          status
        </div>
      );
    },
    cell: (info) => {
      const status = info.getValue() as string;
      const statusStyle =
        status === "success" || status === "active"
          ? { color: "#027A48", backgroundColor: "#ECFDF3" }
          : { color: "#E7B114", backgroundColor: "#FFF8EF" };

      return (
        <div
          style={statusStyle}
          className="flex justify-center items-center gap-2 py-1 pr-4 pl-3 rounded-[20px] text-sm font-medium w-fit capitalize"
        >
          <span>{status}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 cursor-pointer"
        >
          Date added
        </div>
      );
    },
  },

  {
    id: "actions",
    accessorKey: "Action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
