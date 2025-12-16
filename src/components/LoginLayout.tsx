import { Outlet } from "react-router";
import logo from "../assets/logo.png";

export function LoginLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden md:flex w-1/2 bg-[#e3b4b0] justify-center items-center p-12 relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center">
          <img
            src={logo}
            alt="Unhas VF Logo"
            className="w-96 object-contain drop-shadow-lg"
          />
          <p className="text-white mt-4 text-4xl font-light tracking-wide">
            Realçando a sua beleza
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-8">
        <Outlet />
      </div>
    </div>
  );
}
