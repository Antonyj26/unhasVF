import { SchedulesList } from "../components/SchedulesList";
import type { SchedulesType } from "../components/SchedulesList";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { EditScheduleModal } from "../components/EditScheduleModal";
import { AxiosError } from "axios";
import { alertConfirm, alertSuccess, alertError } from "../utils/sweetAlert";
import { Loading } from "../components/Loading";

export function Schedules() {
  const [schedules, setSchedules] = useState<SchedulesType[]>([]);
  const [editScheduleModalOpen, setEditScheduleModalOpen] = useState(false);
  const [scheduleToEdit, setScheduleToEdit] = useState<SchedulesType | null>(
    null
  );
  const [searchSchedule, setSearchSchedule] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useAuth();

  async function fetchSchedules(date?: string) {
    try {
      setIsLoading(true);

      const response = await api.get("/scheduling/index", {
        params: date ? { date } : {},
      });

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
          notes: schedule.notes,
        };
      });

      setSchedules(formattedSchedules);
    } catch (error) {
      alertError("Erro", "Não foi possível carregar os agendamentos");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchSchedules();
  }, [session]);

  function handleEdit(schedule: SchedulesType) {
    setScheduleToEdit(schedule);
    setEditScheduleModalOpen(true);
  }

  async function handleDelete(scheduleId: string) {
    const result = await alertConfirm(
      "Tem certeza?",
      "Esse agendamento será excluído permanentemente."
    );

    if (!result.isConfirmed) return;

    try {
      await api.delete(`scheduling/delete/${scheduleId}`);
      await alertSuccess("Excluído!", "Agendamento excluído com sucesso.");

      window.location.reload();
    } catch (error) {
      if (error instanceof AxiosError) {
        alertError(
          "Erro",
          error.response?.data.message ?? "Erro ao excluir agendamento"
        );
      }
      alertError("Erro inesperado", "Tente novamente");
    }
  }

  return (
    <div className="border p-4 md:p-8 rounded-3xl shadow-lg border-[#9e737a]">
      <h1 className="uppercase text-center mb-10 font-bold text-[#9e737a] text-4xl hover:text-[#e3b4b0] transition-colors">
        Agendamentos
      </h1>
      <form className="flex items-end gap-3 mb-10 w-full">
        <div className="flex-1">
          <Input
            type="date"
            legend="Pesquisar Agendamentos"
            value={searchSchedule}
            onChange={(e) => setSearchSchedule(e.target.value)}
          />
        </div>
        <div className="w-32">
          <Button
            onClick={(e) => {
              e.preventDefault();
              fetchSchedules(searchSchedule);
            }}
          >
            Pesquisar 🔍
          </Button>
        </div>
      </form>
      {isLoading ? (
        <Loading />
      ) : schedules.length === 0 ? (
        <div className="text-center py-20 opacity-60">
          <p className="text-lg font-semibold">
            Nenhum agendamento encontrado 😢
          </p>
        </div>
      ) : (
        <SchedulesList
          schedules={schedules}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {editScheduleModalOpen && scheduleToEdit && (
        <div className="fixed inset-0 bg-black/40 flex flex-col items-center justify-center z-50 backdrop-blur-sm">
          <EditScheduleModal
            schedule={scheduleToEdit}
            onClose={() => {
              setEditScheduleModalOpen(false);
              setScheduleToEdit(null);
            }}
          />
        </div>
      )}
    </div>
  );
}
