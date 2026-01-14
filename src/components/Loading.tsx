import { Atom } from "react-loading-indicators";

export function Loading() {
  return (
    <div className="flex flex-col gap-6 items-center w-full max-w-md">
      <Atom color="#fa95d0" size="small" text="Carregando" textColor="" />
    </div>
  );
}
