import { UserButton } from "@clerk/react";
import { Link, NavLink } from "react-router";

function Header() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-all cursor-pointer hover:text-[#4845D2] hover:font-bold ${
      isActive ? "text-[#4845D2] font-bold" : ""
    }`;

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Link to="/">
        <img
          src="/React_AI_Mock_Interview_Logo.png"
          width={60}
          height={40}
          alt="logo"
        />
      </Link>

      <ul className="hidden md:flex gap-6">
        <li>
          <NavLink to="/" end className={navLinkClass}>
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/questions" className={navLinkClass}>
            Questions
          </NavLink>
        </li>

        <li>
          <NavLink to="/upgrade" className={navLinkClass}>
            Upgrade
          </NavLink>
        </li>

        <li>
          <NavLink to="/how-it-works" className={navLinkClass}>
            How it works?
          </NavLink>
        </li>
      </ul>

      <UserButton />
    </div>
  );
}

export default Header;