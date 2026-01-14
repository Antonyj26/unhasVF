import { BrowserRouter } from "react-router";
import { AppRoutes } from "./AppRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "../components/Loading";

export function Routes() {
  const { session, isLoading } = useAuth();

  function RenderRoute() {
    if (!session) {
      return <AuthRoutes />;
    } else {
      return <AppRoutes />;
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <RenderRoute />
    </BrowserRouter>
  );
}
