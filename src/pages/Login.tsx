import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useActionState } from "react";
import { z, ZodError } from "zod";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { useAuth } from "../hooks/useAuth";
import { alertSuccess } from "../utils/sweetAlert";
import { Loading } from "../components/Loading";

const loginSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().trim().min(1, { message: "Informe a senha" }),
});

export function Login() {
  const [state, formaAction, isLoading] = useActionState(onLogin, null);
  const { save } = useAuth();

  async function onLogin(_: any, formData: FormData) {
    try {
      const data = loginSchema.parse({
        email: formData.get("email"),
        password: formData.get("password"),
      });

      const response = await api.post("/session", data);

      save(response.data);

      await alertSuccess("Login realizado", "Seja bem-vinda! 😊");
    } catch (error) {
      if (error instanceof ZodError) {
        return { message: error.issues[0].message };
      }

      if (error instanceof AxiosError) {
        return { message: error.response?.data.message };
      }

      return { message: "Não foi possível entrar" };
    }
  }

  return (
    <form action={formaAction} className="w-full max-w-sm flex flex-col gap-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#9e737a] mb-2">
          Bem-vinda de volta! 👋
        </h1>
        <p className="text-gray-500 text-xl">
          Por favor, insira seus dados para entrar.
        </p>
      </div>

      <Input
        name="email"
        type="email"
        required
        legend="E-mail"
        placeholder="seu@email.com"
      />
      <Input
        name="password"
        type="password"
        required
        legend="Senha"
        placeholder="••••••"
      />

      <p className="text-sm text-feedback-danger text-center  font-bold">
        {state?.message}
      </p>

      {/* <div className="flex justify-end -mt-2">
        <a href="#" className="text-sm text-[#9e737a] hover:underline">
          Esqueceu a senha?
        </a>
      </div> */}

      <Button type="submit" isLoading={isLoading}>
        Entrar
      </Button>

      {/* <p className="text-center text-sm text-gray-500 mt-4">
        Ainda não tem uma conta?{" "}
        <a href="#" className="text-[#9e737a] font-bold hover:underline">
          Cadastre-se
        </a>
      </p> */}
      {isLoading && <Loading />}
    </form>
  );
}
