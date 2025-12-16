import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
export function NotFound() {
  const navigate = useNavigate();

  const returnToHome = () => {
    navigate("/home");
  };
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold text-[#9e737a] text-center hover:text-[#e3b4b0] transition-colors">
        Ops! Parece que essa página não existe
      </h1>
      <p className="text-center text-6xl">🥹</p>
      <Button onClick={returnToHome}>Voltar para o inicio</Button>
    </div>
  );
}
