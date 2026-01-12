import { Input } from "./Input";
import { Button } from "./Button";
import { Select } from "./Select";
import xSvg from "../assets/x.svg";
import type { SchedulesType } from "./SchedulesList";
import { useState } from "react";
import { api } from "../services/api";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";

type EditScheduleModalProps = {
  schedule: SchedulesType;
  onClose: () => void;
};

const updateSchema = z.object({
  date: z.coerce.date().optional(),
  status: z
    .enum(["PENDENTE", "CONFIRMADO", "CANCELADO", "ENCERRADO"])
    .optional()
    .default("PENDENTE"),
  service: z.enum(["MANICURE", "PEDICURE", "COMPLETO"]).optional(),
  notes: z.string().nullable().optional(),
});

export function EditScheduleModal({
  onClose,
  schedule,
}: EditScheduleModalProps) {
  const [date, setDate] = useState(() => {
    // Se a data for DD/MM/AAAA (formato brasileiro da sua lista)
    if (schedule.date.includes("/")) {
      const [day, month, year] = schedule.date.split("/");
      return `${year}-${month}-${day}`;
    }
    // Se por acaso vier no formato ISO (2025-01-01T00:00:00...)
    return schedule.date.split("T")[0];
  });
  const [hour, setHour] = useState(schedule.hour);
  const [status, setStatus] = useState(schedule.status);
  const [service, setService] = useState(schedule.service);
  const [notes, setNotes] = useState(schedule.notes);

  async function handleSave() {
    if (confirm("Tem certeza que quer alterar esse agendamento?")) {
      try {
        const dateTime = `${date}T${hour}`;
        const data = updateSchema.parse({
          date: dateTime,
          status,
          service,
          notes,
        });

        await api.patch(`scheduling/update/${schedule.id}`, data);

        onClose();
        window.location.reload();
      } catch (error) {
        if (error instanceof AxiosError) {
          return alert(error.response?.data.message);
        }

        if (error instanceof ZodError) {
          return alert(error.issues[0].message);
        }
      }
    }
  }

  return (
    <div className="bg-[#fff9ff] w-full max-w-md p-8 rounded-2xl flex flex-col gap-6 shadow-xl relative">
      <button
        title="Fechar"
        className="absolute top-4 right-4 p-1 hover:bg-pink-50 rounded-md transition-colors cursor-pointer "
        onClick={onClose}
      >
        <img src={xSvg} />
      </button>
      <h1 className="text-center text-[#9e737a] font-bold uppercase">
        Editar Agendamento
      </h1>
      <div className="flex flex-col gap-4">
        <Input
          legend="Hora"
          value={date}
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />
        <Input
          legend="Hora"
          value={hour}
          type="time"
          onChange={(e) => setHour(e.target.value)}
        />
        <Select
          legend="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value as SchedulesType["status"])}
        >
          <option value="PENDENTE">Pendente</option>
          <option value="CONFIRMADO">Confirmado</option>
          <option value="CANCELADO">Cancelado</option>
          <option value="ENCERRADO">Encerrado</option>
        </Select>
        <Select
          legend="Serviço"
          value={service}
          onChange={(e) =>
            setService(e.target.value as SchedulesType["service"])
          }
        >
          <option value="MANICURE">Manicure</option>
          <option value="PEDICURE">Pedicure</option>
          <option value="COMPLETO">Manicure e Pedicure</option>
        </Select>
        <Input
          legend="Observações"
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <Button onClick={handleSave}>Salvar</Button>
    </div>
  );
}
