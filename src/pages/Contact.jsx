import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <section className="page-section">
      <p className="section-tag">Contact</p>
      <h2>Página de contato</h2>
      <p>
        Em um projeto real, esta área poderia conter formulário, canais de
        atendimento e outras informações. Aqui ela serve para validar a
        navegação entre páginas.
      </p>
      <div className="page-links">
        <Link to="/">Voltar para Home</Link>
        <Link to="/about">Ir para About</Link>
      </div>
    </section>
  );
}
