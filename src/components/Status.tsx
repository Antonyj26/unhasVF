import { SERVICE_STATUS } from "../utils/serviceStatus";

type StatusProps = {
  status: string;
};

export function Status({ status }: StatusProps) {
  const current = SERVICE_STATUS[status as keyof typeof SERVICE_STATUS];

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${current.style}`}
    >
      <img src={current.icon} alt={status} className="w-4 h-4" />
      {current.label}
    </span>
  );
}
