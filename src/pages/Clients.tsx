import { Button } from "../components/Button";
import { Input } from "../components/Input";

export type ClientType = {
  id: string;
  name: string;
  phone: string;
};

const clients: ClientType[] = [
  {
    id: "1",
    name: "Vitória França",
    phone: "(61) 99127-8207",
  },
  {
    id: "2",
    name: "Antony",
    phone: "(61) 98888-7777",
  },
  {
    id: "3",
    name: "Maria Silva",
    phone: "(61) 99999-0000",
  },
  {
    id: "4",
    name: "Fernanda Souza",
    phone: "(61) 97777-2222",
  },
];

export function Clients() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <h1 className="text-3xl font-bold text-[#9e737a] uppercase hover:text-[#e3b4b0] transition-colors">
          Meus Clientes
        </h1>

        <div className="w-full md:w-auto">
          <Button>Novo +</Button>
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
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
                  title="Editar"
                >
                  ✏️
                </button>
                <button
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
      {clients.length === 0 && (
        <div className="text-center py-20 opacity-50">
          <p>Nenhum cliente encontrado 😢</p>
        </div>
      )}
    </div>
  );
}
