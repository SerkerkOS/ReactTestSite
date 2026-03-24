import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Explorar</h2>
      <p>
        Use esta area para testar a navegacao, a rota dinamica e o tratamento
        de caminhos invalidos.
      </p>
      <div className="sidebar-links">
        <Link to="/">Pagina inicial</Link>
        <Link to="/about">Sobre o projeto</Link>
        <Link to="/contact">Contato</Link>
        <Link to="/user/21">Perfil do usuario 21</Link>
        <Link to="/rota-inexistente">Testar 404</Link>
      </div>
    </aside>
  );
}
