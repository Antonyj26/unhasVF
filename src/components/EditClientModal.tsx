import xSvg from "../assets/x.svg";
import { Button } from "./Button";
import { Input } from "./Input";
import type { ClientType } from "../pages/Clients";
import { useState } from "react";
import { api } from "../services/api";
import { ZodError, z } from "zod";
import { AxiosError } from "axios";
import {
  alertConfirm,
  alertError,
  alertSuccess,
  alertLoading,
} from "../utils/sweetAlert";

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
    const result = await alertConfirm(
      "Confirmar alteração",
      `Tem certeza que deseja alterar os dados de ${name}?`
    );

    if (!result.isConfirmed) return;

    try {
      alertLoading("Salvando alterações...");
      const data = updateSchema.parse({ name, phone });

      await api.patch(`/client/update/${client.id}`, data);
      await alertSuccess("Atualizado!", "Cliente atualizado com sucesso.");
      onClose();

      window.location.reload();
    } catch (error) {
      if (error instanceof AxiosError) {
        alertError(
          "Erro ao editar cliente",
          error.response?.data.message ?? "Não foi possível editar o cliente"
        );
        return;
      }
      if (error instanceof ZodError) {
        alertError("Erro de validação", error.issues[0].message);
        return;
      }
      alertError("Erro inesperado", "Tente novamente");
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
