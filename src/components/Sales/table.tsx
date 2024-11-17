import { Payment, columns } from "./columns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed75f",
      date: "2024-11-26",
      client: "José Pereira",
      coach: "Fernando Lima",
    },
    {
      id: "728ed74f",
      date: "2024-11-21",
      client: "Luana Oliveira",
      coach: "Juliana Rocha",
    },
    {
      id: "728ed73f",
      date: "2024-11-16",
      client: "Renata Almeida",
      coach: "Carlos Silva",
    },
    {
      id: "728ed72f",
      date: "2024-11-11",
      client: "Marco Aurélio",
      coach: "Fernando Lima",
    },
    {
      id: "728ed71f",
      date: "2024-11-06",
      client: "Tânia Rocha",
      coach: "Juliana Rocha",
    },
    {
      id: "728ed70f",
      date: "2024-11-02",
      client: "Bruna Ferreira",
      coach: "Carlos Silva",
    },
    {
      id: "728ed62f",
      date: "2024-11-25",
      client: "Gustavo Martins",
      coach: "Fernando Lima",
    },
    {
      id: "728ed61f",
      date: "2024-11-20",
      client: "Larissa Costa",
      coach: "Juliana Rocha",
    },
    {
      id: "728ed60f",
      date: "2024-11-15",
      client: "Pedro Rocha",
      coach: "Carlos Silva",
    },
    {
      id: "728ed59f",
      date: "2024-11-10",
      client: "Juliana Lima",
      coach: "Fernando Lima",
    },
    {
      id: "728ed58f",
      date: "2024-11-01",
      client: "Mariana Santos",
      coach: "Carlos Silva",
    },
    {
      id: "728ed57f",
      date: "2024-09-25",
      client: "Lucas Oliveira",
      coach: "Fernando Lima",
    },
    {
      id: "728ed56f",
      date: "2024-09-20",
      client: "Fernanda Costa",
      coach: "Juliana Rocha",
    },
    {
      id: "728ed55f",
      date: "2024-09-15",
      client: "João Pereira",
      coach: "Carlos Silva",
    },
    {
      id: "728ed54f",
      date: "2024-09-10",
      client: "Beatriz Almeida",
      coach: "Fernando Lima",
    },
    {
      id: "728ed53f",
      date: "2024-09-05",
      client: "Carlos Silva",
      coach: "Juliana Rocha",
    },
    {
      id: "728ed52f",
      date: "2024-09-01",
      client: "Ana Souza",
      coach: "Carlos Silva",
    },
    {
      id: "728ed64f",
      date: "2024-09-02",
      client: "Camila Ribeiro",
      coach: "Carlos Silva",
    },
    {
      id: "728ed65f",
      date: "2024-09-06",
      client: "Carlos Alberto",
      coach: "Juliana Rocha",
    },
    {
      id: "728ed66f",
      date: "2024-09-11",
      client: "Rita Oliveira",
      coach: "Fernando Lima",
    },
    {
      id: "728ed67f",
      date: "2024-09-16",
      client: "Márcio Souza",
      coach: "Carlos Silva",
    },
    {
      id: "728ed68f",
      date: "2024-09-21",
      client: "Amanda Lima",
      coach: "Juliana Rocha",
    },
    {
      id: "728ed69f",
      date: "2024-09-26",
      client: "João Costa",
      coach: "Fernando Lima",
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <ScrollArea className="h-[250px] rounded-md border p-4">
      <div className="mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </ScrollArea>
  );
}
