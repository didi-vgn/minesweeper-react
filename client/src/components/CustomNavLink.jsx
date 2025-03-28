import { NavLink } from "react-router-dom";

export default function CustomNavLink({ path, text, end = false }) {
  const active = "bg-gray-500";
  const inactive = "";
  return (
    <li className='p-2'>
      <NavLink
        to={path}
        end={end}
        className={({ isActive }) =>
          `${
            isActive ? active : inactive
          } h-full flex items-center justify-center`
        }
      >
        {text}
      </NavLink>
    </li>
  );
}
