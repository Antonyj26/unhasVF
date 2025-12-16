import { Outlet } from "react-router";
import { TopBar } from "./TopBar";

export function AppLayout() {
  return (
    <div className="bg-[#fff9ff] min-h-screen w-full flex flex-col">
      <TopBar />

      <main className="flex-1 w-full flex items-start justify-center p-4">
        <section className="bg-white p-4 md:p-10 rounded-3xl flex flex-col items-center justify-center w-full max-w-7xl shadow-lg border border-pink-100 min-h-[500px]">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
