import canceladoSvg from "../assets/circle-help.svg";
import pendenteSvg from "../assets/clock-2.svg";
import confirmadoSvg from "../assets/circle-check-big.svg";
import encerradoSvg from "../assets/finish-svgrepo-com.svg";

export const SERVICE_STATUS = {
  CANCELADO: {
    label: "Cancelado",
    style: "bg-red-100 text-feedback-danger font-bold",
    icon: canceladoSvg,
  },
  PENDENTE: {
    label: "Pendente",
    style: "bg-blue-200 text-feedback-pending font-bold",
    icon: pendenteSvg,
  },
  CONFIRMADO: {
    label: "Confirmado",
    style: "bg-green-100 text-feedback-done font-bold",
    icon: confirmadoSvg,
  },
  ENCERRADO: {
    label: "Encerrado",
    style: "bg-pink-50 text-feedback-closed font-bold",
    icon: encerradoSvg,
  },
};
