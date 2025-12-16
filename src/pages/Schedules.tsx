import { SchedulesList } from "../components/SchedulesList";
import type { SchedulesType } from "../components/SchedulesList";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

const schedules: SchedulesType[] = [
  {
    id: "1",
    client: "Antony",
    contact: 61991278207,
    hour: "09:00",
    date: "09/12/2025",
    status: "Encerrado",
    service: "Completo",
  },
  {
    id: "2",
    client: "Vitória",
    contact: 61991278207,
    hour: "10:00",
    date: "09/12/2025",
    status: "Pendente",
    service: "Manicure",
  },
  {
    id: "2",
    client: "Vitória",
    contact: 61991278207,
    hour: "10:00",
    date: "09/12/2025",
    status: "Confirmado",
    service: "Manicure",
  },
  {
    id: "2",
    client: "Vitória",
    contact: 61991278207,
    hour: "10:00",
    date: "09/12/2025",
    status: "Cancelado",
    service: "Manicure",
  },
  {
    id: "2",
    client: "Vitória",
    contact: 61991278207,
    hour: "10:00",
    date: "09/12/2025",
    status: "Cancelado",
    service: "Manicure",
  },
  {
    id: "2",
    client: "Vitória",
    contact: 61991278207,
    hour: "10:00",
    date: "09/12/2025",
    status: "Cancelado",
    service: "Manicure",
  },
  {
    id: "2",
    client: "Vitória",
    contact: 61991278207,
    hour: "10:00",
    date: "09/12/2025",
    status: "Cancelado",
    service: "Manicure",
  },
];

export function Schedules() {
  return (
    <div className="border p-4 md:p-8 rounded-3xl shadow-lg border-[#9e737a]">
      <h1 className="uppercase text-center mb-10 font-bold text-[#9e737a] text-4xl hover:text-[#e3b4b0] transition-colors">
        Agendamentos
      </h1>
      <form className="flex items-end gap-3 mb-10 w-full">
        <div className="flex-1">
          <Input type="date" legend="Pesquisar Agendamentos" />
        </div>
        <div className="w-32">
          <Button>Pesquisar 🔍</Button>
        </div>
      </form>
      <SchedulesList schedules={schedules} />
    </div>
  );
}
