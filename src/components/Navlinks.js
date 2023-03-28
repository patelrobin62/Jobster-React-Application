
import { NavLink } from "react-router-dom";
import React from "react";
import { useDispatch} from "react-redux";
import { toggleSidebar } from "../Features/UserSlice";
import { Links } from "../utils/Links";
const NavLinks = () => {
    const dispatch=useDispatch()
  return (
    <div className="nav-links">
      {Links.map((item) => {
        const { id, text, path, icon } = item;
        return (
          <NavLink
            key={id}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={() => dispatch(toggleSidebar())}
            to={path}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}

export default NavLinks