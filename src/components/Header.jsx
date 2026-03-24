import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <div>
        <p className="eyebrow">Atividade de React Router</p>
        <h1 className="brand">React Router Lab</h1>
      </div>
      <nav className="nav-links" aria-label="Navegacao principal">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/user/7">User 7</NavLink>
      </nav>
    </header>
  );
}
