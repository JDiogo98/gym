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
import { Toaster } from "@/components/ui/toaster";

import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "@/components/Loading";
import api from "../../../lib/api";

export type clientsDataTypes = {
  id: number; // O id agora parece ser um número
  name: string;
  phoneNumber: string;
  sex: "M" | "F" | "Other"; // Valores possíveis para o campo sex
  lastTraining: string | null;
  birthDate: string;
  registrationDate: string; // Data de registro
  createdAt: string; // Data de criação
  updatedAt: string; // Data de atualização
  academyId: number; // Id da academia
  coachId: number; // Id do treinador
  academy: {
    name: string; // Nome da academia
  };
  coach: {
    name: string; // Nome do treinador
  };
};

const textClasses = "content-start select-none text-xs sm:text-sm ";

export const buttonClasses = "p-1 sm:p-2 md:p-3 lg:p-4";

export default function ClientsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [loadingUsers, setLoadingUsers] = React.useState(true);

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [clientsData, setClientsData] = React.useState<
    clientsDataTypes[] | null
  >(null);

  const { toast } = useToast();

  const columns: ColumnDef<clientsDataTypes>[] = [
    {
      accessorKey: "name",
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
          {row.getValue("name")}
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
        <div className={`capitalize hidden lg:flex ml-4 ${textClasses}`}>
          {(row.getValue("coach") as clientsDataTypes["coach"])?.name ??
            "Sem treinador"}
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
          {(row.getValue("academy") as clientsDataTypes["academy"])?.name ??
            "Sem academia"}
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
          {row.getValue("lastTraining") ?? "Sem treinos"}
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
          <DeleteButton
            id={row.original.id}
            name={row.original.name}
            handleDelete={() =>
              handleDeleteClient(row.original.id, row.original.name)
            }
          />
        </div>
      ),
    },
  ];

  const handleDeleteClient = (
    deletedClientId: string | number,
    name: string
  ) => {
    setClientsData((prevData) =>
      prevData
        ? prevData.filter((client) => client.id !== deletedClientId)
        : null
    );
  };

  React.useEffect(() => {
    api
      .get("/api/clients")
      .then((response) => {
        setClientsData(response.data);
        setLoadingUsers(false);
      })
      .catch((error) => console.error("Error fetching clients data:", error))
      .finally(() => setLoadingUsers(false));
    // TODO: Implementar tratamento de erro
  }, []);

  const table = useReactTable({
    data: clientsData ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
  });

  return (
    <div className="p-4 lg:p-6 min-w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar Clientes..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
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
            {loadingUsers ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <LoadingSpinner text="Carregar clientes" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
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
      <div className="flex justify-evenly">
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
        <Link className="mt-5 flex" href={"/clients/add"}>
          <Button variant="outline">Adicionar Cliente</Button>
        </Link>
        <Toaster />
      </div>
    </div>
  );
}
