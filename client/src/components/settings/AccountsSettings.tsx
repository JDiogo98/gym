"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckCircle, MoreVertical, Clock } from "lucide-react";

// Mock data for user accounts
const initialAccounts = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@example.com",
    status: "active",
    verified: true,
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@example.com",
    status: "active",
    verified: false,
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    email: "pedro@example.com",
    status: "suspended",
    verified: true,
  },
  {
    id: 4,
    name: "Ana Rodrigues",
    email: "ana@example.com",
    status: "inactive",
    verified: false,
  },
];

export default function AccountsSettings() {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);

  const handleStatusChange = (id: number, status: string) => {
    setAccounts(
      accounts.map((account) =>
        account.id === id ? { ...account, status } : account
      )
    );
  };

  const handleVerifyAccount = () => {
    if (!selectedAccount) return;

    setAccounts(
      accounts.map((account) =>
        account.id === selectedAccount.id
          ? { ...account, verified: true }
          : account
      )
    );
    setIsVerifyDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Ativo</Badge>;
      case "suspended":
        return <Badge className="bg-yellow-500">Suspenso</Badge>;
      case "inactive":
        return <Badge className="bg-gray-500">Inativo</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Contas</CardTitle>
        <CardDescription>
          Ative, desative, suspenda ou verifique contas de usuários.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Verificado</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell className="font-medium">{account.name}</TableCell>
                <TableCell>{account.email}</TableCell>
                <TableCell>{getStatusBadge(account.status)}</TableCell>
                <TableCell>
                  {account.verified ? (
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Verificado</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-yellow-500 mr-2" />
                      <span>Pendente</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(account.id, "active")}
                      >
                        Ativar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(account.id, "inactive")
                        }
                      >
                        Desativar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(account.id, "suspended")
                        }
                      >
                        Suspender
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {!account.verified && (
                        <Dialog
                          open={isVerifyDialogOpen}
                          onOpenChange={setIsVerifyDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedAccount(account);
                              }}
                            >
                              Verificar Conta
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Verificar Conta</DialogTitle>
                              <DialogDescription>
                                Tem certeza que deseja verificar a conta de{" "}
                                {selectedAccount?.name}?
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => setIsVerifyDialogOpen(false)}
                              >
                                Cancelar
                              </Button>
                              <Button onClick={handleVerifyAccount}>
                                Verificar
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
