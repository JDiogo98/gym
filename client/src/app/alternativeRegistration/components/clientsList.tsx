import LoadingSpinner from "@/components/Loading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { apiPublic } from "../../../../lib/api";
import { toast } from "sonner";

type Client = {
  clientId: number;
  clientName: string;
};

type ClientsListProps = {
  setClient?: Dispatch<
    SetStateAction<{ clientId: string; clientName: string }>
  >;
};

const ClientsList: React.FC<ClientsListProps> = ({ setClient }) => {
  const [loading, setLoading] = useState(true);
  const [availableClients, setAvailableClients] = useState<
    Client[] | undefined
  >();
  const [filteredClients, setFilteredClients] = useState<
    Client[] | undefined
  >();

  const handleSetClient = (clientId: string) => {
    if (!clientId) {
      setClient?.({ clientId: "", clientName: "" });
      return;
    }

    const selectedClient = availableClients?.find(
      (client) => client.clientId.toString() === clientId
    );
    if (selectedClient) {
      setClient?.({
        clientId: selectedClient.clientId.toString(),
        clientName: selectedClient.clientName,
      });
    }
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await apiPublic.get("/api/clients");
        setAvailableClients(response.data);
        setFilteredClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
        toast.error("Erro ao carregar clientes");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);


  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mt-4">
      <Label htmlFor="searchable-select">Selecione o cliente:</Label>
      <Select onValueChange={(clientId) => handleSetClient(clientId)}>
        <SelectTrigger
          id="searchable-select"
          className="w-full p-4 border rounded"
        >
          <SelectValue placeholder="Selecione uma opção" />
        </SelectTrigger>
        <SelectContent>
          <Input
            type="text"
            placeholder="Pesquisar..."
            className="w-full p-2 mb-2 border rounded"
            onChange={(e) => {
              const searchTerm = e.target.value.toLowerCase();

              const filteredClients: Client[] | undefined =
                availableClients?.filter((client) =>
                  client.clientName.toLowerCase().includes(searchTerm)
                );
              setFilteredClients(filteredClients);
            }}
          />
          {filteredClients?.map((client) => (
            <SelectItem
              key={client.clientId}
              value={client.clientId.toString()}
            >
              {client.clientName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ClientsList;
