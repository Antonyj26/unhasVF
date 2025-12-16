import { Route, Routes } from "react-router";
import { Login } from "../pages/Login";
import { LoginLayout } from "../components/LoginLayout";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginLayout />}>
        <Route path="/" element={<Login />} />
      </Route>
    </Routes>
  );
}
