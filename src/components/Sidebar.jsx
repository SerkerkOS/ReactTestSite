import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Explorar</h2>
      <p>
        Use esta área para testar a navegação, a rota dinâmica e o tratamento
        de caminhos inválidos.
      </p>
      <div className="sidebar-links">
        <Link to="/">Página inicial</Link>
        <Link to="/about">Sobre o projeto</Link>
        <Link to="/contact">Contato</Link>
        <Link to="/user/21">Perfil do usuário 21</Link>
        <Link to="/rota-inexistente">Testar 404</Link>
      </div>
    </aside>
  );
}
