import { topBarLinks } from "../utils/topBar";
import { TopBarLinks } from "./TopBarLink";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import logout from "../assets/logout-svgrepo-com.svg";

export function TopBar() {
  const { remove } = useAuth();
  return (
    <header className="w-full h-24 bg-[#e3b4b0] flex items-center justify-between px-10 shadow-md">
      <div className="flex items-center h-full">
        <a href="/">
          <img src={logo} className="h-20 object-contain" alt="Logo UnhasVF" />
        </a>
      </div>

      <nav className="flex gap-6">
        {topBarLinks.map(({ label, to, icon }) => (
          <TopBarLinks key={to} to={to} label={label} icon={icon} />
        ))}
        <Link
          to="/"
          title="Sair"
          className="flex items-centers gap-2 md:gap-3 p-2 md:p-3 rounded-md text-gray-950 hover:bg-white/50 transition ease-linear"
          onClick={() => remove()}
        >
          <img src={logout} className="w-6 h-6 md:w-8 md:h-8" />
        </Link>
      </nav>
    </header>
  );
}
