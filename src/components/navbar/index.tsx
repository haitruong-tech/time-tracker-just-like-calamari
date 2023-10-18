import clsx from "clsx";
import { memo } from "react";
import { Link, NavLink } from "react-router-dom";
import { ROUTES } from "src/routes";

const Navbar = memo(() => {
  return (
    <div className="xl:fixed xl:top-16 xl:left-16">
      <Link className="text-2xl font-bold" to="/">
        Tasks Tracker
      </Link>
      <nav className="mt-4">
        <ul>
          <li>
            <NavLink
              className={({ isActive }) =>
                clsx(
                  "text-xl text-[#DA62F9] border-b border-b-[#DA62F9] pl-5 relative",
                  {
                    'font-bold before:left-0 before:absolute before:content-["*_"]':
                      isActive,
                  }
                )
              }
              to={ROUTES.HOME}
            >
              Time Tracker
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                clsx(
                  "text-xl text-[#DA62F9] border-b border-b-[#DA62F9] pl-5 relative",
                  {
                    'font-bold before:left-0 before:absolute before:content-["*_"]':
                      isActive,
                  }
                )
              }
              to={ROUTES.TIME_LOG}
            >
              Time Log
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
