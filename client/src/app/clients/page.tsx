"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Sheet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { SheetEdit } from "@/components/Sheet";
import { DeleteButton } from "@/components/DeleteButton";

export const data: clientsData[] = [
    {
      id: "m5gr84i9",
      client: "João Silva",
      academy: "Coimbra",
      lastTraining: "2024/11/03 - 09:00",
      registrationDate: "2019/11/03",
      coach: "Rafael Oliveira"
    },
    {
      id: "3u1reuv4",
      client: "Maria Costa",
      academy: "Coimbra",
      lastTraining: "2024/11/01 - 12:00",
      registrationDate: "2021/11/01",
      coach: "Rafael Oliveira"
    },
    {
      id: "derv1ws0",
      client: "Miguel Ferreira",
      academy: "Porto",
      lastTraining: "2024/10/21 - 14:00",
      registrationDate: "2020/10/21",
      coach: "Mariana Alves"
    },
    {
      id: "5kma53ae",
      client: "Sofia Oliveira",
      academy: "Coimbra",
      lastTraining: "2024/11/04 - 07:00",
      registrationDate: "2020/11/04",
      coach: "Rafael Oliveira"
    },
    {
      id: "bhqecj4p",
      client: "Pedro Martins",
      academy: "Porto",
      lastTraining: "2024/11/06 - 14:00",
      registrationDate: "2024/11/06",
      coach: "Mariana Alves"
    },
    {
      id: "xa1d82l3",
      client: "Ana Rodrigues",
      academy: "Lisboa",
      lastTraining: "2024/11/07 - 10:00",
      registrationDate: "2022/02/15",
      coach: "Carlos Nogueira"
    },
    {
      id: "yc2b93m4",
      client: "Tiago Almeida",
      academy: "Porto",
      lastTraining: "2024/10/20 - 18:30",
      registrationDate: "2021/06/11",
      coach: "Mariana Alves"
    },
    {
      id: "zf3c04n5",
      client: "Beatriz Santos",
      academy: "Braga",
      lastTraining: "2024/09/15 - 08:00",
      registrationDate: "2020/08/09",
      coach: "Carlos Nogueira"
    },
    {
      id: "wd4d15o6",
      client: "Rui Vieira",
      academy: "Lisboa",
      lastTraining: "2024/08/12 - 17:45",
      registrationDate: "2019/12/22",
      coach: "Carlos Nogueira"
    },
    {
      id: "ve5e26p7",
      client: "Clara Nunes",
      academy: "Coimbra",
      lastTraining: "2024/07/30 - 09:30",
      registrationDate: "2021/03/18",
      coach: "Rafael Oliveira"
    }
  ];
  

export type clientsData = {
  id: string;
  client: string;
  academy: string;
  lastTraining: string;
  registrationDate: string;
  coach: string;
};

export const columns: ColumnDef<clientsData>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },

  {
    accessorKey: "client",
    header: ({ column }) => {
      return (
        <Button
          className="select-none"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize ml-3 select-none font-bold">
        {row.getValue("client")}
      </div>
    ),
  },
  {
    accessorKey: "coach",
    header: "Treinador/a",
    cell: ({ row }) => (
      <div className="capitalize select-none">
        {row.getValue("coach")}
      </div>
    ),
  },
  {
    accessorKey: "registrationDate",
    header: "Data de inscrição",
    cell: ({ row }) => (
      <div className="capitalize select-none">
        {row.getValue("registrationDate")}
      </div>
    ),
  },
  {
    accessorKey: "academy",
    header: "Academia",
    cell: ({ row }) => (
      <div className="capitalize select-none">{row.getValue("academy")}</div>
    ),
  },
  {
    accessorKey: "lastTraining",
    header: () => <div className="text-right select-none">Último Treino</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium select-none">
          {row.getValue("lastTraining")}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-3">
          <SheetEdit clientData={row.original}></SheetEdit>
          <DeleteButton></DeleteButton>
        </div>
      );
    },
  },
];

export default function ClientsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-screen p-4 lg:p-6">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar Clientes..."
          value={(table.getColumn("client")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("client")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                    <TableCell key={cell.id}>
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
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Seguinte
          </Button>
        </div>
      </div>
    </div>
  );
}
