import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="page-section">
      <p className="section-tag">Home</p>
      <h2>Site com múltiplas páginas usando React Router</h2>
      <p>
        Esta página demonstra a configuração básica de rotas, componentes de
        layout e melhoria de performance com carregamento sob demanda.
      </p>
      <div className="card-grid">
        <article className="info-card">
          <h3>Rotas</h3>
          <p>
            Cada página possui uma rota própria definida com o componente
            `Route`.
          </p>
        </article>
        <article className="info-card">
          <h3>Layout</h3>
          <p>
            `Header`, `Sidebar` e `Footer` são compartilhados entre todas as
            páginas.
          </p>
        </article>
        <article className="info-card">
          <h3>Performance</h3>
          <p>
            As páginas são carregadas com `React.lazy` e `Suspense` para reduzir
            o custo inicial.
          </p>
        </article>
      </div>
      <div className="page-links">
        <Link to="/about">Ir para About</Link>
        <Link to="/contact">Ir para Contact</Link>
        <Link to="/user/1">Abrir perfil 1</Link>
      </div>
    </section>
  );
}
