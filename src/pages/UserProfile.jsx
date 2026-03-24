import { Link, useParams } from "react-router-dom";

export default function UserProfile() {
  const { id } = useParams();

  return (
    <section className="page-section">
      <p className="section-tag">URL Params</p>
      <h2>Perfil dinamico do usuario</h2>
      <p>
        O parametro capturado na URL foi: <strong>{id}</strong>
      </p>
      <p>
        Essa rota mostra como ler valores dinamicos com `useParams` em caminhos
        como `/user/:id`.
      </p>
      <div className="page-links">
        <Link to="/">Voltar para Home</Link>
        <Link to="/user/42">Abrir perfil 42</Link>
        <Link to="/user/99">Abrir perfil 99</Link>
      </div>
    </section>
  );
}
