import { Route, Routes } from "react-router";
import { Schedule } from "../pages/Schedule";
import { Home } from "../pages/Home";
import { Schedules } from "../pages/Schedules";
import { NotFound } from "../pages/NotFound";
import { AppLayout } from "../components/AppLayout";
import { Clients } from "../pages/Clients";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/" element={<Home />} />
        <Route path="/schedules" element={<Schedules />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
