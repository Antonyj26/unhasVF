import { Button } from "./Button";
import { Status } from "./Status";

export type SchedulesType = {
  id: string;
  client: string;
  hour: string;
  phone: number;
  date: string;
  service: "MANICURE" | "PEDICURE" | "COMPLETO";
  status: "PENDENTE" | "CONFIRMADO" | "CANCELADO" | "ENCERRADO";
  notes?: string;
};

type SchedulesListProps = {
  schedules: SchedulesType[];
  onEdit: (schedule: SchedulesType) => void;
  onDelete: (scheduleId: string) => void;
};

export function SchedulesList({
  schedules,
  onEdit,
  onDelete,
}: SchedulesListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {schedules.map((schedule) => (
        <div
          key={schedule.id}
          className="flex flex-col gap-5 border border-pink-100 p-6 rounded-2xl w-full max-w-sm bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-[#9e737a]">
              Cliente:
              <span className="text-black font-normal"> {schedule.client}</span>
            </h3>

            <p className="text-sm text-gray-600">
              <strong>Horário: </strong> {schedule.hour}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Contato: </strong> {schedule.phone}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Data: </strong> {schedule.date}
            </p>
          </div>

          <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
            <p className="text-sm">
              <strong>Serviço: </strong> {schedule.service}
            </p>
            {schedule.notes && (
              <p className="text-sm">
                <strong>Observações: </strong>
                {schedule.notes}
              </p>
            )}
            <div className="flex justify-between items-center">
              <Status status={schedule.status} />
            </div>
          </div>
          {!schedule.status.includes("CANCELADO") &&
            !schedule.status.includes("ENCERRADO") && (
              <Button onClick={() => onEdit(schedule)}>Editar ✏️</Button>
            )}

          <Button onClick={() => onDelete(schedule.id)}>Excluir 🗑️</Button>
        </div>
      ))}
    </div>
  );
}
