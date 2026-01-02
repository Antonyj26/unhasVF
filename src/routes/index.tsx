import { BrowserRouter } from "react-router";
import { AppRoutes } from "./AppRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { useAuth } from "../hooks/useAuth";

export function Routes() {
  const { session, isLoading } = useAuth();

  function RenderRoute() {
    if (!session) {
      return <AuthRoutes />;
    } else {
      return <AppRoutes />;
    }
  }

  return (
    <BrowserRouter>
      <RenderRoute />
    </BrowserRouter>
  );
}
