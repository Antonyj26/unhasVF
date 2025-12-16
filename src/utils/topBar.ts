import home from "../assets/icons8-casa.svg";
import clients from "../assets/users-svgrepo-com.svg";
import schedule from "../assets/schedule-calendar-svgrepo-com.svg";
import schedules from "../assets/nail-polish-svgrepo-com.svg";

const topBarLinks = [
  {
    label: "Inicio",
    to: "/",
    icon: home,
  },
  {
    label: "Clientes",
    to: "/clients",
    icon: clients,
  },
  {
    label: "Agendar",
    to: "/schedule",
    icon: schedule,
  },
  { label: "Agendamentos", to: "/schedules", icon: schedules },
];

export { topBarLinks };
