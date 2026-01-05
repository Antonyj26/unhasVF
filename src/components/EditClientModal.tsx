import xSvg from "../assets/x.svg";
import { Button } from "./Button";
import { Input } from "./Input";
import type { ClientType } from "../pages/Clients";
import { useState } from "react";
import { api } from "../services/api";
import { ZodError, z } from "zod";
import { AxiosError } from "axios";

type EditClientModalProps = {
  onClose: () => void;
  client: ClientType;
};

const updateSchema = z.object({
  name: z.string().min(3, "Nome deve ter mais de 3 caracteres").optional(),
  phone: z
    .string()
    .regex(
      /^(?:\(?\d{2}\)?\s?)(?:9\d{4}|\d{4})-?\d{4}$/,
      "Telefone inválido. Informe o DDD."
    )
    .optional(),
});

export function EditClientModal({ onClose, client }: EditClientModalProps) {
  const [name, setName] = useState(client.name);
  const [phone, setPhone] = useState(client.phone);

  async function handleUpdate() {
    if (confirm(`Tem certeza que deseja alterar ${name}?`)) {
      const data = updateSchema.parse({ name, phone });

      await api.patch(`/client/update/${client.id}`, data);

      onClose();

      window.location.reload();

      try {
      } catch (error) {
        if (error instanceof AxiosError) {
          return alert(
            error.response?.data.message ?? "Erro ao editar cliente"
          );
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
        title="Fechar"
        onClick={onClose}
        className="absolute top-4 right-4 p-1 hover:bg-pink-50 rounded-md transition-colors cursor-pointer "
      >
        <img src={xSvg} />
      </button>
      <h1 className="text-center text-[#9e737a] font-bold uppercase">
        Editar Cliente
      </h1>

      <div className="flex flex-col gap-4">
        <Input
          legend="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          legend="Contato"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <Button onClick={handleUpdate}>Salvar</Button>
    </div>
  );
}
