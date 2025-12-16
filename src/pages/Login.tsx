import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function Login() {
  return (
    <form className="w-full max-w-sm flex flex-col gap-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#9e737a] mb-2">
          Bem-vinda de volta! 👋
        </h1>
        <p className="text-gray-500 text-xl">
          Por favor, insira seus dados para entrar.
        </p>
      </div>

      <Input
        type="email"
        required
        legend="E-mail"
        placeholder="seu@email.com"
      />
      <Input type="password" required legend="Senha" placeholder="••••••" />

      <div className="flex justify-end -mt-2">
        <a href="#" className="text-sm text-[#9e737a] hover:underline">
          Esqueceu a senha?
        </a>
      </div>

      <Button type="submit">Entrar</Button>

      <p className="text-center text-sm text-gray-500 mt-4">
        Ainda não tem uma conta?{" "}
        <a href="#" className="text-[#9e737a] font-bold hover:underline">
          Cadastre-se
        </a>
      </p>
    </form>
  );
}
