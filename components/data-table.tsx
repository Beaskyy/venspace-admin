"use client";

import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "./ui/button";
import { useState } from "react";

import { ChevronLeft, ChevronRight, ListFilter } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  tableName: string;
  tableDescription?: string;
  currentPage: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  tableName,
  tableDescription,
  currentPage,
  totalPages,
  onPageChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 50,
        pageIndex: 0,
      },
    },
    manualPagination: true,
    pageCount: totalPages || 1,
  });

  const pageSize = table.getState().pagination.pageSize;
  const pageIndex = table.getState().pagination.pageIndex;
  // const totalItems = table.getFilteredRowModel().rows.length;
  // const startItem = pageIndex * pageSize + 1;
  // const endItem = Math.min((pageIndex + 1) * pageSize, totalItems);

  // Call onPageChange whenever pageIndex changes
  const handlePageChange = (newPageIndex: number) => {
    console.log(newPageIndex, "current page");
    table.setPageIndex(newPageIndex); // Update table's pageIndex
    onPageChange?.(newPageIndex + 1); // Trigger parent callback (adjust for 1-based indexing)
  };

  return (
    <div className="w-full mb-6">
      <div className="border border-[#EAECF0] rounded-2xl bg-white">
        <div className="flex justify-between items-center gap-4 px-6 rounded-t-xl md:h-[81px] bg-white border-b border-[#EAECF0]">
          <div className="flex flex-col gap-1.5 py-5">
            <h3 className="md:text-lg text-base text-[#101828] font-medium leading-[18px]">
              {tableName}
            </h3>
            <h3 className="md:text-sm text-xs text-[#667085] leading-[]14px">
              {tableDescription}
            </h3>
          </div>
          <div>
            <Sheet>
              <SheetTrigger>
                <Button className="bg-white text-[#344054] rounded-lg md:text-sm text-xs font-normal md:py-2.5 py-1 md:px-[14px] px-4 md:w-[111px] w-24 border border-[#F3F4F6] md:h-11 h-9 hover:bg-[#f7f7f7]">
                  <ListFilter className="size-5 text-[#344054]" />
                  Filter by
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[287px]">
                <div>
                  <p></p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-sm text-[#667085] h-11 font-medium leading-5 bg-[#FCFCFD] px-6 py-4 whitespace-nowrap"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-6 py-4 text-sm first:text-[#101828] text-[#667085] h-[72px] border-y border-[#EAECF0] font-medium leading-[20.3px]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex lg:flex-row flex-col justify-between items-end lg:items-center gap-4 px-6 py-4 h-[52px] border-b rounded-b-xl border-[#EAECF0] bg-[#F7F7F8]">
          <div className="text-sm text-[#414141] font-semibold">
            Page {currentPage} of {table.getPageCount()}
          </div>
          <div className="flex items-center justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pageIndex - 1)} // Handle previous page
              disabled={!table.getCanPreviousPage()}
              className="border border-[#F2F4F7] p-2 bg-white"
            >
              <ChevronLeft className="size-5 text-black" />
            </Button>
            {Array.from({ length: table.getPageCount() }).map((_, i) => (
              <Button
                key={i}
                variant={i === currentPage - 1 ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(i)}
                className={`rounded-full p-[13px] size-8 ${
                  i === currentPage - 1 ? "bg-black text-white" : ""
                }`}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pageIndex + 1)} // Handle next page
              disabled={!table.getCanNextPage()}
              className="border border-[#F2F4F7] p-2 bg-white"
            >
              <ChevronRight className="size-5 text-black" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
