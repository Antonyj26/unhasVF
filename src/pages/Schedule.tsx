import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import type { ClientType } from "./Clients";
import { useEffect, useState } from "react";
import { api } from "../services/api";

export function Schedule() {
  const [selectedClient, setSelectedClient] = useState<ClientType | null>(null);
  const [clients, setClients] = useState<ClientType[]>([]);

  useEffect(() => {
    async function fetchedClients() {
      try {
        const response = await api.get("/client/index");

        setClients(response.data);
      } catch (error) {}
    }

    fetchedClients();
  }, []);

  function handleClientChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const idSelected = e.target.value;

    const clienteEncontrado = clients.find(
      (client) => client.id === idSelected
    );

    setSelectedClient(clienteEncontrado || null);
  }

  return (
    <div className="flex flex-col gap pink-500">
      <h1 className="uppercase text-center mb-6 md:mb-10 text-[#9e737a] font-bold text-2xl hover:text-[#e3b4b0] transition-colors">
        Criar um agendamento 🥰
      </h1>
      <form className="w-full flex flex-col gap-4 border p-4 md:p-8 border-[#9e737a] rounded-3xl shadow-lg">
        <Select
          legend="Selecione o Cliente"
          onChange={handleClientChange}
          value={selectedClient?.id}
        >
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </Select>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/3">
            <Input legend="Data" type="date" />
          </div>
          <div className="w-full md:w-1/3">
            <Input legend="Hora" type="time" />
          </div>
          <div className="w-full md:w-1/3">
            <Input
              legend="Contato"
              placeholder="(00) 000000000"
              readOnly
              value={selectedClient?.phone || ""}
            />
          </div>
        </div>
        <Input
          legend="Observação"
          placeholder="Observações opcionais (caso a cliente peça algo específico)"
        />

        <Select legend="Serviço">
          <option value="manicure">Manicure</option>
          <option value="pedicure">Pedicure</option>
          <option value="manicure e pedicure">Manicure e Pedicure</option>
        </Select>
        <Button>Criar</Button>
      </form>
    </div>
  );
}
