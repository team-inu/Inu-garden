"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {  PO } from "@/data/schema";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { PORowActions } from "./po-row-action";


export const columns: ColumnDef<PO>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="id" />
    ),
    cell: ({ row }) => <div className="">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="name" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("name")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("description")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  
  {
    id: "actions",
    cell: ({ row }) => <PORowActions row={row} />,
  },
];
