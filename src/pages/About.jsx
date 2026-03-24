import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="page-section">
      <p className="section-tag">About</p>
      <h2>Como a aplicacao foi organizada</h2>
      <p>
        O roteamento principal fica no arquivo `App.jsx`. O `BrowserRouter` foi
        configurado em `main.jsx`, enquanto o layout comum usa `Outlet` para
        renderizar o conteudo central.
      </p>
      <div className="page-links">
        <Link to="/">Voltar para Home</Link>
        <Link to="/contact">Ir para Contact</Link>
      </div>
    </section>
  );
}
