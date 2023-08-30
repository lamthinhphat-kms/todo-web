import React from "react";
import "./styles.css";
import { Link, Outlet, useMatch, useResolvedPath } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <nav className="nav">
        <Link to="/" className="home-title">
          Home
        </Link>
        <ul>
          <CustomLink to="/api-list">API</CustomLink>
          <CustomLink to="/about">About</CustomLink>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

function CustomLink({ to, children, ...props }: { to: string; children: any }) {
  const resolvePath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvePath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default NavBar;
