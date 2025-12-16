import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import happy from "../assets/happy-woman-svgrepo-com.svg";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 items-center w-full max-w-md">
      <img
        src={happy}
        alt="Unhas VF"
        className="w-32 h-32 object-contain drop-shadow-sm"
      />
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#9e737a] mb-2 hover:text-[#e3b4b0] transition-colors">
          Bem-vinda à UnhasVF
        </h1>
        <p className="text-sm text-gray-500">É muito bom ver você novamente!</p>
      </div>
      <div className="w-full mt-4">
        <Button onClick={() => navigate("/schedules")}>Ver Agendamentos</Button>
      </div>
    </div>
  );
}
