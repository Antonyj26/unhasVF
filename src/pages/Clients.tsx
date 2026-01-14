import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useState, useEffect } from "react";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { useAuth } from "../hooks/useAuth";
import { NewClientModal } from "../components/NewClientModal";
import { EditClientModal } from "../components/EditClientModal";
import { alertConfirm, alertError, alertSuccess } from "../utils/sweetAlert";

export type ClientType = {
  id: string;
  name: string;
  phone: string;
};

export function Clients() {
  const { session } = useAuth();
  const [clients, setClients] = useState<ClientType[]>([]);
  const [NewClientModalOpen, setNewClientModalOpen] = useState(false);
  const [EditClientModalOpen, setEditClientModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientType | null>(null);

  useEffect(() => {
    async function fetchedClients() {
      try {
        if (!session) {
          return;
        }
        const response = await api.get("/client/index");

        const data = response.data;

        setClients(data);
      } catch (error) {
        if (error instanceof AxiosError) {
          alertError("Erro", "Nenhum cliente encontrado");
        }
      }
    }

    fetchedClients();
  }, [session]);

  async function handleDelete(clientId: string) {
    const result = await alertConfirm(
      "Tem certeza?",
      "Esse cliente será excluído permanentemente."
    );

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/client/delete/${clientId}`);

      await alertSuccess("Excluído!", "Cliente excluído com sucesso.");

      window.location.reload();
    } catch (error) {
      if (error instanceof AxiosError) {
        alertError(
          "Erro ao excluir cliente",
          "Não foi possível excluir o cliente"
        );
      }
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <h1 className="text-3xl font-bold text-[#9e737a] uppercase hover:text-[#e3b4b0] transition-colors">
          Meus Clientes
        </h1>

        <div className="w-full md:w-auto">
          <Button onClick={() => setNewClientModalOpen(true)}>Novo +</Button>
        </div>
      </div>
      <div className=" bg-white sp-4 rounded-2xl flex gap-4 items-end">
        <div className="flex-1">
          <Input placeholder="Buscar por nome..." legend="Pesquisar clientes" />
        </div>
        <button className="bg-[#9e737a] text-white p-3 rounded-md hover:bg-[#e3b4b0] transition-colors font-bold">
          🔍
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {clients.map((client) => (
          <div
            key={client.id}
            className="group bg-white p-5 rounded-2xl shadow-sm border border-transparent hover:border-pink-200 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-pink-50 flex items-center justify-center text-[#9e737a] font-bold text-xl border border-pink-100">
                {client.name.charAt(0)}
              </div>

              <div>
                <h3 className="font-bold text-lg text-gray-800">
                  {client.name}
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg border border-gray-100 text-gray-600 text-sm font-mono">
                📞 {client.phone}
              </div>

              <div className="flex gap-2 ml-auto">
                <button
                  onClick={() => {
                    setSelectedClient(client);
                    setEditClientModalOpen(true);
                  }}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
                  title="Editar"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(client.id)}
                  className="p-2 text-red-400 hover:bg-red-50 rounded-md transition-colors"
                  title="Excluir"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center py-20 opacity-50">
        <p>Nenhum cliente encontrado 😢</p>
      </div>

      {NewClientModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex flex-col items-center justify-center z-50 backdrop-blur-sm">
          <NewClientModal onClose={() => setNewClientModalOpen(false)} />
        </div>
      )}
      {EditClientModalOpen && selectedClient && (
        <div className="fixed inset-0 bg-black/40 flex flex-col items-center justify-center z-50 backdrop-blur-sm">
          <EditClientModal
            client={selectedClient}
            onClose={() => {
              setEditClientModalOpen(false);
              setSelectedClient(null);
            }}
          />
        </div>
      )}
    </div>
  );
}
