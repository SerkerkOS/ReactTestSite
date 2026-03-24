import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import ProductCard from "./ProductCard.jsx";

const PRODUCTS_API_URL = "https://fakestoreapi.com/products";
const sortOptions = [
  { label: "Destaques", value: "featured" },
  { label: "Menor preço", value: "price-asc" },
  { label: "Maior preço", value: "price-desc" },
  { label: "Nome A-Z", value: "title-asc" },
];

export default function ProductList({
  extraProducts,
  favoriteIds,
  onAddToCart,
  onRemoveProduct,
  onToggleFavorite,
}) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("featured");

  async function fetchProducts() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.get(PRODUCTS_API_URL);
      setProducts(response.data);
    } catch (error) {
      setErrorMessage("Não foi possível carregar os produtos da Fake Store API.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    axios
      .get(PRODUCTS_API_URL)
      .then((response) => {
        if (isMounted) {
          setProducts(response.data);
          setErrorMessage("");
        }
      })
      .catch(() => {
        if (isMounted) {
          setErrorMessage("Não foi possível carregar os produtos da Fake Store API.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const allProducts = [...extraProducts, ...products];
  const categoryOptions = [
    { label: "Todas as categorias", value: "all" },
    ...[...new Set(allProducts.map((product) => product.category))]
      .filter(Boolean)
      .sort((firstCategory, secondCategory) =>
        firstCategory.localeCompare(secondCategory)
      )
      .map((category) => ({ label: category, value: category })),
  ];

  const displayedProducts = [...allProducts]
    .filter((product) => {
      if (selectedCategory === "all") {
        return true;
      }

      return product.category === selectedCategory;
    })
    .filter((product) => {
      const normalizedQuery = searchTerm.trim().toLowerCase();

      if (!normalizedQuery) {
        return true;
      }

      return (
        product.title.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery)
      );
    })
    .sort((firstProduct, secondProduct) => {
      if (selectedSort === "price-asc") {
        return Number(firstProduct.price) - Number(secondProduct.price);
      }

      if (selectedSort === "price-desc") {
        return Number(secondProduct.price) - Number(firstProduct.price);
      }

      if (selectedSort === "title-asc") {
        return firstProduct.title.localeCompare(secondProduct.title);
      }

      if (firstProduct.id.toString().startsWith("local-")) {
        return -1;
      }

      if (secondProduct.id.toString().startsWith("local-")) {
        return 1;
      }

      return 0;
    });

  return (
    <section className="surface-panel form-panel">
      <div className="product-summary">
        <div>
          <h2 className="panel-title">Lista de produtos</h2>
          <p className="panel-subtitle">
            Produtos carregados da API e itens adicionados manualmente.
          </p>
        </div>
        <strong>{displayedProducts.length} itens</strong>
      </div>

      <div className="toolbar-grid">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Buscar por nome ou descrição"
          />
        </span>
        <Dropdown
          value={selectedCategory}
          options={categoryOptions}
          onChange={(event) => setSelectedCategory(event.value)}
          placeholder="Filtrar categoria"
        />
        <Dropdown
          value={selectedSort}
          options={sortOptions}
          onChange={(event) => setSelectedSort(event.value)}
          placeholder="Ordenar"
        />
        <Button
          label="Atualizar"
          icon="pi pi-refresh"
          outlined
          onClick={fetchProducts}
          loading={isLoading}
        />
      </div>

      <div className="quick-stats">
        <div className="stat-chip">
          <span className="stat-chip-value">{allProducts.length}</span>
          <span>catálogo total</span>
        </div>
        <div className="stat-chip">
          <span className="stat-chip-value">{extraProducts.length}</span>
          <span>itens locais</span>
        </div>
        <div className="stat-chip">
          <span className="stat-chip-value">{favoriteIds.length}</span>
          <span>favoritos</span>
        </div>
      </div>

      {isLoading ? (
        <div className="status-box">
          <div>
            <ProgressSpinner style={{ width: "48px", height: "48px" }} />
            <p>Carregando produtos...</p>
          </div>
        </div>
      ) : null}

      {!isLoading && errorMessage ? (
        <div className="status-box">
          <Message severity="error" text={errorMessage} />
        </div>
      ) : null}

      {!isLoading && !errorMessage ? (
        displayedProducts.length > 0 ? (
          <div className="product-grid">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favoriteIds.includes(product.id)}
                onAddToCart={onAddToCart}
                onRemoveProduct={onRemoveProduct}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="status-box">
            <p>Nenhum produto corresponde aos filtros aplicados.</p>
          </div>
        )
      ) : null}
    </section>
  );
}
