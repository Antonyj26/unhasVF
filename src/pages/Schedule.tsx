import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import type { ClientType } from "./Clients";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { alertError, alertLoading, alertSuccess } from "../utils/sweetAlert";

const createSchema = z.object({
  date: z.coerce.date(),
  status: z
    .enum(["PENDENTE", "CONFIRMADO", "CANCELADO", "ENCERRADO"])
    .optional()
    .default("PENDENTE"),
  service: z.enum(["MANICURE", "PEDICURE", "COMPLETO"]),
  clientId: z.string().uuid(),
  notes: z.string().nullable().optional(),
});

export function Schedule() {
  const [selectedClient, setSelectedClient] = useState<ClientType | null>(null);
  const [clients, setClients] = useState<ClientType[]>([]);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState("");
  const [service, setService] = useState<string>("");
  const [notes, setNotes] = useState<string | null>(null);
  const navigate = useNavigate();

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (!selectedClient) {
        return alertError("Error", "Selecione um cliente");
      }

      if (!date || !time) {
        alertError("Error!", "Selecione uma data e hora");
      }
      alertLoading("Criando agendamento...");

      const dateTime = `${date}T${time}`;

      const data = createSchema.parse({
        date: dateTime,
        status: "PENDENTE",
        service,
        clientId: selectedClient?.id,
        notes,
      });

      await api.post("/scheduling/create", data);

      await alertSuccess(
        "Agendamento criado!",
        "O agendamento foi criado com sucesso."
      );

      navigate("/schedules");
    } catch (error) {
      if (error instanceof AxiosError) {
        alertError(
          "Erro ao criar agendamento",
          error.response?.data.message ?? "Não foi possível criar o agendamento"
        );
      }

      if (error instanceof ZodError) {
        alertError("Erro de validação", "Preencha todos os campos");
      }
    }
  }

  return (
    <div className="flex flex-col gap pink-500">
      <h1 className="uppercase text-center mb-6 md:mb-10 text-[#9e737a] font-bold text-2xl hover:text-[#e3b4b0] transition-colors">
        Criar um agendamento 🥰
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4 border p-4 md:p-8 border-[#9e737a] rounded-3xl shadow-lg"
      >
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
            <Input
              legend="Data"
              type="date"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3">
            <Input
              legend="Hora"
              type="time"
              onChange={(e) => setTime(e.target.value)}
            />
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
          onChange={(e) => setNotes(e.target.value)}
        />

        <Select legend="Serviço" onChange={(e) => setService(e.target.value)}>
          <option value="MANICURE">Manicure</option>
          <option value="PEDICURE">Pedicure</option>
          <option value="COMPLETO">Manicure e Pedicure</option>
        </Select>
        <Button type="submit">Criar</Button>
      </form>
    </div>
  );
}
