import { NavLink } from "react-router-dom";

export default function CustomNavLink({ path, text }) {
  const active = "bg-gray-500 p-5 w-30";
  const inactive = "w-50 p-5";
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? active : inactive)}
      >
        {text}
      </NavLink>
    </li>
  );
}
