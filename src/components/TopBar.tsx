import { topBarLinks } from "../utils/topBar";
import { TopBarLinks } from "./TopBarLink";
import logo from "../assets/logo.png";

export function TopBar() {
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
      </nav>
    </header>
  );
}
