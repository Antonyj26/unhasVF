import { Input } from "./Input";
import { Button } from "./Button";
import xSvg from "../assets/x.svg";
import { useState } from "react";
import { api } from "../services/api";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";

type NewClientModalProps = {
  onClose: () => void;
};

const createSchema = z.object({
  name: z.string().min(3, "Nome deve ter mais de 3 caracteres"),
  phone: z
    .string()
    .regex(
      /^(?:\(?\d{2}\)?\s?)(?:9\d{4}|\d{4})-?\d{4}$/,
      "Telefone inválido. Informe o DDD."
    ),
});

export function NewClientModal({ onClose }: NewClientModalProps) {
  const [name, setName] = useState<string>();
  const [phone, setPhone] = useState<string>();

  async function createNewClient() {
    if (confirm("Tem certeza que deseja criar esse cliente?")) {
      try {
        const data = createSchema.parse({ name, phone });

        await api.post("/client/create", data);
        onClose();
        window.location.reload();
      } catch (error) {
        if (error instanceof AxiosError) {
          return alert(error.response?.data.message ?? "Erro ao criar cliente");
        }
        if (error instanceof ZodError) {
          return alert(error.issues[0].message);
        }
      }
    }
  }

  return (
    <div className="bg-[#fff9ff] w-full max-w-md p-8 rounded-2xl flex flex-col gap-6 shadow-xl relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1 hover:bg-pink-50 rounded-md transition-colors cursor-pointer "
        title="Fechar"
      >
        <img src={xSvg} />
      </button>
      <h1 className="text-center text-[#9e737a] font-bold uppercase">
        Criar novo cliente
      </h1>

      <div className="flex flex-col gap-4">
        <Input
          legend="Nome"
          placeholder="Digite o nome do cliente"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          legend="Contato"
          placeholder="(00) 000000000"
          type="number"
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <Button onClick={createNewClient}>Criar Cliente</Button>
    </div>
  );
}
