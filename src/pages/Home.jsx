import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="page-section">
      <p className="section-tag">Home</p>
      <h2>Site com multiplas paginas usando React Router</h2>
      <p>
        Esta pagina demonstra a configuracao basica de rotas, componentes de
        layout e melhoria de performance com carregamento sob demanda.
      </p>
      <div className="card-grid">
        <article className="info-card">
          <h3>Rotas</h3>
          <p>
            Cada pagina possui uma rota propria definida com o componente
            `Route`.
          </p>
        </article>
        <article className="info-card">
          <h3>Layout</h3>
          <p>
            `Header`, `Sidebar` e `Footer` sao compartilhados entre todas as
            paginas.
          </p>
        </article>
        <article className="info-card">
          <h3>Performance</h3>
          <p>
            As paginas sao carregadas com `React.lazy` e `Suspense` para reduzir
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
