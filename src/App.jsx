import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import ProductForm from "./components/ProductForm.jsx";
import ProductList from "./components/ProductList.jsx";

export default function App() {
  const [customProducts, setCustomProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const toastRef = useRef(null);

  function handleAddProduct(product) {
    setCustomProducts((currentProducts) => [product, ...currentProducts]);
    toastRef.current?.show({
      severity: "success",
      summary: "Produto adicionado",
      detail: `${product.title} entrou no catálogo.`,
      life: 2500,
    });
  }

  function handleRemoveProduct(productId) {
    setCustomProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId)
    );
    setFavoriteIds((currentFavorites) =>
      currentFavorites.filter((favoriteId) => favoriteId !== productId)
    );
    toastRef.current?.show({
      severity: "info",
      summary: "Produto removido",
      detail: "O produto local foi removido da vitrine.",
      life: 2200,
    });
  }

  function handleAddToCart(product) {
    setCartCount((currentCount) => currentCount + 1);
    toastRef.current?.show({
      severity: "success",
      summary: "Adicionado ao carrinho",
      detail: `${product.title} foi adicionado ao carrinho.`,
      life: 2200,
    });
  }

  function handleToggleFavorite(productId) {
    setFavoriteIds((currentFavorites) => {
      const isFavorite = currentFavorites.includes(productId);
      const nextFavorites = isFavorite
        ? currentFavorites.filter((id) => id !== productId)
        : [...currentFavorites, productId];

      toastRef.current?.show({
        severity: isFavorite ? "warn" : "info",
        summary: isFavorite ? "Favorito removido" : "Favorito salvo",
        detail: isFavorite
          ? "O produto saiu da sua lista de favoritos."
          : "O produto foi salvo nos favoritos.",
        life: 1800,
      });

      return nextFavorites;
    });
  }

  return (
    <div className="store-app">
      <Toast ref={toastRef} position="top-right" />
      <header className="store-hero">
        <div className="grid align-items-center">
          <div className="col-12 lg:col-7">
            <p className="hero-tag">Loja Virtual React</p>
            <h1>Catálogo conectado a uma API externa com cadastro local de produtos</h1>
            <p className="hero-copy">
              A aplicação consome a Fake Store API com `axios`, exibe produtos em
              cards do PrimeReact e permite adicionar novos itens em tempo real.
            </p>
            <div className="hero-actions">
              <Button
                label="Ver produtos"
                icon="pi pi-shopping-bag"
                onClick={() =>
                  document
                    .getElementById("product-list-section")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              />
              <Button
                label="Adicionar produto"
                icon="pi pi-plus"
                severity="secondary"
                outlined
                onClick={() =>
                  document
                    .getElementById("product-form-section")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              />
            </div>
          </div>
          <div className="col-12 lg:col-5">
            <div className="hero-panel">
              <div>
                <span className="hero-metric">{customProducts.length}</span>
                <p>produtos adicionados manualmente</p>
              </div>
              <div>
                <span className="hero-metric">{favoriteIds.length}</span>
                <p>produtos marcados como favoritos</p>
              </div>
              <div>
                <span className="hero-metric">{cartCount}</span>
                <p>itens enviados para o carrinho</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="store-content">
        <div className="grid">
          <div className="col-12 xl:col-4" id="product-form-section">
            <ProductForm onAddProduct={handleAddProduct} />
          </div>
          <div className="col-12 xl:col-8" id="product-list-section">
            <ProductList
              extraProducts={customProducts}
              favoriteIds={favoriteIds}
              onAddToCart={handleAddToCart}
              onRemoveProduct={handleRemoveProduct}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
