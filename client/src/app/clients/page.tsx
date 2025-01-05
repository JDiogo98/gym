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
import { ArrowUpDown, FileSearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DeleteButton } from "@/components/DeleteButton";
import { EditClient } from "@/components/Sheet/EditClient";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const data: clientsData[] = [
  {
    id: "m5gr84i9",
    client: "João Silva",
    academy: "Coimbra",
    lastTraining: "2024/11/03 - 09:00",
    registrationDate: "2019/11/03",
    coach: "Rafael Oliveira",
  },
  {
    id: "3u1reuv4",
    client: "Maria Costa",
    academy: "Coimbra",
    lastTraining: "2024/11/01 - 12:00",
    registrationDate: "2021/11/01",
    coach: "Rafael Oliveira",
  },
  {
    id: "derv1ws0",
    client: "Miguel Ferreira",
    academy: "Porto",
    lastTraining: "2024/10/21 - 14:00",
    registrationDate: "2020/10/21",
    coach: "Mariana Alves",
  },
  {
    id: "5kma53ae",
    client: "Sofia Oliveira",
    academy: "Coimbra",
    lastTraining: "2024/11/04 - 07:00",
    registrationDate: "2020/11/04",
    coach: "Rafael Oliveira",
  },
  {
    id: "bhqecj4p",
    client: "Pedro Martins",
    academy: "Porto",
    lastTraining: "2024/11/06 - 14:00",
    registrationDate: "2024/11/06",
    coach: "Mariana Alves",
  },
  {
    id: "xa1d82l3",
    client: "Ana Rodrigues",
    academy: "Lisboa",
    lastTraining: "2024/11/07 - 10:00",
    registrationDate: "2022/02/15",
    coach: "Carlos Nogueira",
  },
  {
    id: "yc2b93m4",
    client: "Tiago Almeida",
    academy: "Porto",
    lastTraining: "2024/10/20 - 18:30",
    registrationDate: "2021/06/11",
    coach: "Mariana Alves",
  },
  {
    id: "zf3c04n5",
    client: "Beatriz Santos",
    academy: "Braga",
    lastTraining: "2024/09/15 - 08:00",
    registrationDate: "2020/08/09",
    coach: "Carlos Nogueira",
  },
  {
    id: "wd4d15o6",
    client: "Rui Vieira",
    academy: "Lisboa",
    lastTraining: "2024/08/12 - 17:45",
    registrationDate: "2019/12/22",
    coach: "Carlos Nogueira",
  },
  {
    id: "ve5e26p7",
    client: "Clara Nunes",
    academy: "Coimbra",
    lastTraining: "2024/07/30 - 09:30",
    registrationDate: "2021/03/18",
    coach: "Rafael Oliveira",
  },
  {
    id: "f1a61b8c",
    client: "Luís Monteiro",
    academy: "Porto",
    lastTraining: "2024/11/08 - 10:00",
    registrationDate: "2023/11/08",
    coach: "Paula Ferreira",
  },
  {
    id: "g2b72c9d",
    client: "Carla Antunes",
    academy: "Lisboa",
    lastTraining: "2024/10/22 - 09:30",
    registrationDate: "2020/05/10",
    coach: "Paula Ferreira",
  },
  {
    id: "h3c83d0e",
    client: "André Cardoso",
    academy: "Braga",
    lastTraining: "2024/11/02 - 14:00",
    registrationDate: "2022/12/01",
    coach: "Hugo Matos",
  },
  {
    id: "i4d94e1f",
    client: "Joana Lima",
    academy: "Coimbra",
    lastTraining: "2024/11/05 - 16:00",
    registrationDate: "2019/06/25",
    coach: "Hugo Matos",
  },
  {
    id: "j5e05f2g",
    client: "Ricardo Sousa",
    academy: "Lisboa",
    lastTraining: "2024/11/01 - 18:00",
    registrationDate: "2020/03/12",
    coach: "Sofia Pires",
  },
  {
    id: "k6f16g3h",
    client: "Helena Carvalho",
    academy: "Porto",
    lastTraining: "2024/10/28 - 10:30",
    registrationDate: "2021/07/04",
    coach: "Sofia Pires",
  },
  {
    id: "l7g27h4i",
    client: "Fernando Dias",
    academy: "Braga",
    lastTraining: "2024/11/07 - 15:30",
    registrationDate: "2023/01/19",
    coach: "João Magalhães",
  },
  {
    id: "m8h38i5j",
    client: "Carolina Fonseca",
    academy: "Lisboa",
    lastTraining: "2024/10/30 - 11:15",
    registrationDate: "2020/09/10",
    coach: "João Magalhães",
  },
  {
    id: "n9i49j6k",
    client: "Manuel Torres",
    academy: "Porto",
    lastTraining: "2024/11/03 - 17:00",
    registrationDate: "2022/04/05",
    coach: "Inês Gomes",
  },
  {
    id: "o0j50k7l",
    client: "Marta Teixeira",
    academy: "Braga",
    lastTraining: "2024/11/09 - 08:00",
    registrationDate: "2019/11/09",
    coach: "Inês Gomes",
  },
  {
    id: "p1k61l8m",
    client: "Alexandre Pinto",
    academy: "Coimbra",
    lastTraining: "2024/10/18 - 16:45",
    registrationDate: "2023/03/27",
    coach: "Diogo Martins",
  },
  {
    id: "q2l72m9n",
    client: "Sara Monteiro",
    academy: "Porto",
    lastTraining: "2024/10/25 - 13:00",
    registrationDate: "2021/02/15",
    coach: "Diogo Martins",
  },
  {
    id: "r3m83n0o",
    client: "Fábio Ribeiro",
    academy: "Lisboa",
    lastTraining: "2024/11/02 - 12:00",
    registrationDate: "2022/08/30",
    coach: "Ana Vieira",
  },
  {
    id: "s4n94o1p",
    client: "Isabel Santos",
    academy: "Braga",
    lastTraining: "2024/11/05 - 08:30",
    registrationDate: "2019/12/01",
    coach: "Ana Vieira",
  },
  {
    id: "t5o05p2q",
    client: "Jorge Neves",
    academy: "Coimbra",
    lastTraining: "2024/11/06 - 17:45",
    registrationDate: "2020/06/18",
    coach: "Vera Marques",
  },
  {
    id: "u6p16q3r",
    client: "Diana Lopes",
    academy: "Lisboa",
    lastTraining: "2024/10/27 - 14:15",
    registrationDate: "2021/10/22",
    coach: "Vera Marques",
  },
  {
    id: "v7q27r4s",
    client: "Paulo Gonçalves",
    academy: "Porto",
    lastTraining: "2024/11/08 - 07:30",
    registrationDate: "2023/04/11",
    coach: "Hugo Lopes",
  },
  {
    id: "w8r38s5t",
    client: "Raquel Rocha",
    academy: "Braga",
    lastTraining: "2024/11/01 - 16:00",
    registrationDate: "2022/02/08",
    coach: "Hugo Lopes",
  },
  {
    id: "x9s49t6u",
    client: "Bruno Vieira",
    academy: "Coimbra",
    lastTraining: "2024/10/31 - 18:30",
    registrationDate: "2021/12/03",
    coach: "Rita Costa",
  },
  {
    id: "y0t50u7v",
    client: "Patrícia Mendes",
    academy: "Lisboa",
    lastTraining: "2024/11/04 - 09:00",
    registrationDate: "2020/01/14",
    coach: "Rita Costa",
  },
  {
    id: "z1u61v8w",
    client: "Diogo Barbosa",
    academy: "Porto",
    lastTraining: "2024/10/29 - 13:15",
    registrationDate: "2023/06/12",
    coach: "Luís Moreira",
  },
  {
    id: "a2v72w9x",
    client: "Inês Faria",
    academy: "Braga",
    lastTraining: "2024/11/03 - 10:45",
    registrationDate: "2020/10/10",
    coach: "Luís Moreira",
  },
  {
    id: "b3w83x0y",
    client: "Rafael Moura",
    academy: "Lisboa",
    lastTraining: "2024/11/07 - 11:30",
    registrationDate: "2022/07/28",
    coach: "Joana Ribeiro",
  },
  {
    id: "c4x94y1z",
    client: "Teresa Magalhães",
    academy: "Coimbra",
    lastTraining: "2024/10/26 - 15:30",
    registrationDate: "2019/09/01",
    coach: "Joana Ribeiro",
  },
  {
    id: "d5y05z2a",
    client: "Renato Costa",
    academy: "Braga",
    lastTraining: "2024/11/08 - 18:00",
    registrationDate: "2020/05/23",
    coach: "Filipe Andrade",
  },
  {
    id: "e6z16a3b",
    client: "Catarina Leal",
    academy: "Porto",
    lastTraining: "2024/11/02 - 09:30",
    registrationDate: "2021/11/15",
    coach: "Filipe Andrade",
  },
  {
    id: "f7a27b4c",
    client: "Gonçalo Simões",
    academy: "Lisboa",
    lastTraining: "2024/11/05 - 12:45",
    registrationDate: "2023/02/07",
    coach: "Rita Martins",
  },
  {
    id: "g8b38c5d",
    client: "Letícia Silva",
    academy: "Coimbra",
    lastTraining: "2024/10/20 - 14:00",
    registrationDate: "2021/08/01",
    coach: "Rita Martins",
  },
  {
    id: "h9c49d6e",
    client: "Bruna Cardoso",
    academy: "Porto",
    lastTraining: "2024/10/30 - 17:15",
    registrationDate: "2020/11/30",
    coach: "Pedro Almeida",
  },
  {
    id: "i0d50e7f",
    client: "Eduardo Pereira",
    academy: "Braga",
    lastTraining: "2024/11/04 - 08:30",
    registrationDate: "2022/04/14",
    coach: "Pedro Almeida",
  },
  {
    id: "j1e61f8g",
    client: "Natália Santos",
    academy: "Lisboa",
    lastTraining: "2024/10/27 - 18:45",
    registrationDate: "2021/09/12",
    coach: "Mário Lopes",
  },
  {
    id: "k2f72g9h",
    client: "Tiago Machado",
    academy: "Coimbra",
    lastTraining: "2024/11/06 - 11:15",
    registrationDate: "2023/03/10",
    coach: "Mário Lopes",
  },
  {
    id: "l3g83h0i",
    client: "Sílvia Correia",
    academy: "Porto",
    lastTraining: "2024/10/25 - 13:45",
    registrationDate: "2020/06/20",
    coach: "Sandra Cunha",
  },
  {
    id: "m4h94i1j",
    client: "Leonardo Oliveira",
    academy: "Braga",
    lastTraining: "2024/11/07 - 10:30",
    registrationDate: "2019/12/18",
    coach: "Sandra Cunha",
  },
  {
    id: "n5i05j2k",
    client: "Francisca Araújo",
    academy: "Lisboa",
    lastTraining: "2024/10/28 - 09:00",
    registrationDate: "2021/07/25",
    coach: "Miguel Barbosa",
  },
  {
    id: "o6j16k3l",
    client: "Daniel Tavares",
    academy: "Coimbra",
    lastTraining: "2024/11/01 - 16:15",
    registrationDate: "2020/03/06",
    coach: "Miguel Barbosa",
  },
  {
    id: "p7k27l4m",
    client: "João Ferreira",
    academy: "Porto",
    lastTraining: "2024/10/26 - 14:00",
    registrationDate: "2022/05/22",
    coach: "Patrícia Ramos",
  },
  {
    id: "q8l38m5n",
    client: "Sofia Reis",
    academy: "Braga",
    lastTraining: "2024/11/02 - 11:30",
    registrationDate: "2023/01/05",
    coach: "Patrícia Ramos",
  },
  {
    id: "r9m49n6o",
    client: "Vítor Gomes",
    academy: "Lisboa",
    lastTraining: "2024/11/08 - 08:15",
    registrationDate: "2020/12/19",
    coach: "Cláudia Antunes",
  },
  {
    id: "s0n50o7p",
    client: "Ana Moreira",
    academy: "Coimbra",
    lastTraining: "2024/11/04 - 10:45",
    registrationDate: "2019/04/17",
    coach: "Cláudia Antunes",
  },
];

export type clientsData = {
  id: string;
  client: string;
  academy: string;
  lastTraining: string;
  registrationDate: string;
  coach: string;
};

const textClasses = "content-start select-none text-xs sm:text-sm ";

export const buttonClasses = "p-1 sm:p-2 md:p-3 lg:p-4";

export const columns: ColumnDef<clientsData>[] = [
  {
    accessorKey: "client",
    header: ({ column }) => (
      <Button
        className={`${textClasses}`}
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Cliente
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className={`capitalize ml-4 font-semibold ${textClasses}`}>
        {row.getValue("client")}
      </div>
    ),
  },
  {
    accessorKey: "coach",
    header: ({ column }) => (
      <Button
        className={`${textClasses} hidden lg:flex`}
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Treinador
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className={`capitalize hidden lg:flex ml-4  ${textClasses}`}>
        {row.getValue("coach")}
      </div>
    ),
  },
  {
    accessorKey: "registrationDate",
    header: ({ column }) => (
      <Button
        className={`${textClasses} hidden lg:flex`}
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Inscrição
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className={`capitalize hidden  lg:flex ml-4 ${textClasses}`}>
        {row.getValue("registrationDate")}
      </div>
    ),
  },
  {
    accessorKey: "academy",
    header: ({ column }) => (
      <Button
        className={`${textClasses} hidden lg:flex`}
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Academia
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className={`capitalize hidden lg:flex ml-4 ${textClasses}`}>
        {row.getValue("academy")}
      </div>
    ),
  },
  {
    accessorKey: "lastTraining",
    header: ({ column }) => (
      <Button
        className={textClasses}
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Último
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className={`font-medium ml-4 ${textClasses}`}>
        {row.getValue("lastTraining")}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex justify-end gap-1">
        <Link href={`clients/${row.original.id}`}>
          <Button className={buttonClasses} variant="outline">
            <FileSearchIcon />
          </Button>
        </Link>
        <EditClient clientData={row.original} />
        <DeleteButton />
      </div>
    ),
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
    <div className="p-4 lg:p-6 min-w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar Clientes..."
          value={(table.getColumn("client")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("client")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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
      <Pagination className="mt-5 flex justify-start">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            />
          </PaginationItem>
          {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map(
            (pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href="#"
                  onClick={() => table.setPageIndex(pageNumber - 1)}
                  isActive={
                    table.getState().pagination.pageIndex === pageNumber - 1
                  }
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
