import { SchedulesList } from "../components/SchedulesList";
import type { SchedulesType } from "../components/SchedulesList";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";

export function Schedules() {
  const [schedules, setSchedules] = useState<SchedulesType[]>([]);
  const { session } = useAuth();

  useEffect(() => {
    async function fetchSchedules() {
      const response = await api.get("/scheduling/index");

      const formattedSchedules = response.data.map((schedule: any) => {
        const dateObj = new Date(schedule.date);

        return {
          id: schedule.id,
          client: schedule.client.name,
          phone: schedule.client.phone,
          date: dateObj.toLocaleDateString("pt-BR"),
          hour: dateObj.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          service: schedule.service,
          status: schedule.status,
        };
      });
      setSchedules(formattedSchedules);
    }

    fetchSchedules();
  }, [session]);

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
