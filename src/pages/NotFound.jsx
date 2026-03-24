import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page-section">
      <p className="section-tag">Erro 404</p>
      <h2>Página não encontrada</h2>
      <p>
        A rota acessada não existe. Use os links abaixo para voltar para uma
        área válida da aplicação.
      </p>
      <div className="page-links">
        <Link to="/">Voltar para Home</Link>
        <Link to="/about">Ir para About</Link>
      </div>
    </section>
  );
}
