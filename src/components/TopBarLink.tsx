import { Link } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

type TopBarLinksProps = LinkProps & {
  label: string;
  icon?: string;
};

export function TopBarLinks({ label, to, icon, ...rest }: TopBarLinksProps) {
  return (
    <Link
      to={to}
      {...rest}
      className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-md text-gray-950 hover:bg-white/50 transition ease-linear"
    >
      {icon && <img src={icon} className="w-6 h-6 md:w-8 md:h-8" alt={label} />}

      <span className="hidden md:block font-medium">{label}</span>
    </Link>
  );
}
