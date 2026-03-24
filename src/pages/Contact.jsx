import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <section className="page-section">
      <p className="section-tag">Contact</p>
      <h2>Pagina de contato</h2>
      <p>
        Em um projeto real, esta area poderia conter formulario, canais de
        atendimento e outras informacoes. Aqui ela serve para validar a
        navegacao entre paginas.
      </p>
      <div className="page-links">
        <Link to="/">Voltar para Home</Link>
        <Link to="/about">Ir para About</Link>
      </div>
    </section>
  );
}
