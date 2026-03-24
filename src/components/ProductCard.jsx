import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";

function formatPrice(price) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(price) || 0);
}

export default function ProductCard({
  product,
  isFavorite,
  onAddToCart,
  onRemoveProduct,
  onToggleFavorite,
}) {
  const isLocalProduct = product.id.toString().startsWith("local-");
  const ratingValue = product.rating?.rate || 4;

  const header = (
    <div className="product-media">
      <div className="product-badges">
        <Tag
          value={isLocalProduct ? "Novo local" : "API"}
          rounded
          severity={isLocalProduct ? "success" : "info"}
        />
        <Button
          type="button"
          rounded
          text
          severity={isFavorite ? "danger" : "secondary"}
          icon={isFavorite ? "pi pi-heart-fill" : "pi pi-heart"}
          aria-label="Favoritar produto"
          onClick={() => onToggleFavorite(product.id)}
        />
      </div>
      <img
        className="product-image"
        src={product.image}
        alt={product.title}
        loading="lazy"
      />
    </div>
  );

  const footer = (
    <div className="product-footer-wrap">
      <div className="product-footer">
        <span className="product-price">{formatPrice(product.price)}</span>
        <div className="product-actions">
          {isLocalProduct ? (
            <Button
              label="Remover"
              icon="pi pi-trash"
              size="small"
              severity="danger"
              text
              onClick={() => onRemoveProduct(product.id)}
            />
          ) : null}
          <Button
            label="Comprar"
            icon="pi pi-shopping-cart"
            size="small"
            onClick={() => onAddToCart(product)}
          />
        </div>
      </div>
    </div>
  );

  return (
    <Card
      className="product-card surface-panel"
      title={product.title}
      subTitle={<Tag value={product.category} rounded severity="info" />}
      header={header}
      footer={footer}
    >
      <div className="product-rating-row">
        <Rating value={ratingValue} readOnly cancel={false} />
        <span className="product-rating-text">
          {ratingValue.toFixed(1)}
          {product.rating?.count ? ` / ${product.rating.count} avaliações` : " destaque"}
        </span>
      </div>
      <p className="product-description">{product.description}</p>
    </Card>
  );
}
