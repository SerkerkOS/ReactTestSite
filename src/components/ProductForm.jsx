import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Message } from "primereact/message";
import { Dropdown } from "primereact/dropdown";

const initialForm = {
  title: "",
  price: null,
  category: "",
  description: "",
  image: "",
};

const fallbackImage =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80";
const categorySuggestions = [
  { label: "Eletrônicos", value: "electronics" },
  { label: "Joias", value: "jewelery" },
  { label: "Moda masculina", value: "men's clothing" },
  { label: "Moda feminina", value: "women's clothing" },
  { label: "Casa", value: "home decor" },
];

export default function ProductForm({ onAddProduct }) {
  const [formData, setFormData] = useState(initialForm);
  const [successMessage, setSuccessMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const newProduct = {
      id: `local-${Date.now()}`,
      title: formData.title.trim(),
      price: Number(formData.price),
      category: formData.category.trim(),
      description: formData.description.trim(),
      image: formData.image.trim() || fallbackImage,
    };

    onAddProduct(newProduct);
    setFormData(initialForm);
    setSuccessMessage("Produto adicionado com sucesso.");
  }

  return (
    <section className="surface-panel form-panel">
      <h2 className="panel-title">Adicionar produto</h2>
      <p className="panel-subtitle">
        Preencha o formulário para incluir um novo item na lista exibida.
      </p>

      {successMessage ? (
        <div className="mb-4">
          <Message severity="success" text={successMessage} />
        </div>
      ) : null}

      <form className="grid" onSubmit={handleSubmit}>
        <div className="col-12">
          <label className="field-label" htmlFor="title">
            Nome do produto
          </label>
          <InputText
            id="title"
            className="w-full"
            value={formData.title}
            onChange={(event) =>
              setFormData((current) => ({ ...current, title: event.target.value }))
            }
            required
          />
        </div>

        <div className="col-12 md:col-6">
          <label className="field-label" htmlFor="price">
            Preço
          </label>
          <InputNumber
            id="price"
            className="w-full"
            inputClassName="w-full"
            value={formData.price}
            onValueChange={(event) =>
              setFormData((current) => ({ ...current, price: event.value }))
            }
            mode="currency"
            currency="BRL"
            locale="pt-BR"
            min={0}
            required
          />
        </div>

        <div className="col-12 md:col-6">
          <label className="field-label" htmlFor="category">
            Categoria
          </label>
          <Dropdown
            id="category"
            className="w-full"
            editable
            options={categorySuggestions}
            value={formData.category}
            onChange={(event) =>
              setFormData((current) => ({ ...current, category: event.value }))
            }
            placeholder="Selecione ou digite uma categoria"
            required
          />
        </div>

        <div className="col-12">
          <label className="field-label" htmlFor="image">
            URL da imagem
          </label>
          <InputText
            id="image"
            className="w-full"
            value={formData.image}
            onChange={(event) =>
              setFormData((current) => ({ ...current, image: event.target.value }))
            }
            placeholder="Opcional"
          />
        </div>

        <div className="col-12">
          <div className="preview-box">
            <span className="preview-label">Preview</span>
            <div className="preview-content">
              <img
                src={formData.image.trim() || fallbackImage}
                alt="Preview do produto"
              />
              <div>
                <strong>{formData.title || "Seu produto aparecerá aqui"}</strong>
                <p>{formData.category || "Categoria do produto"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <label className="field-label" htmlFor="description">
            Descrição
          </label>
          <InputTextarea
            id="description"
            className="w-full"
            rows={5}
            value={formData.description}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
            required
          />
        </div>

        <div className="col-12">
          <Button type="submit" label="Adicionar produto" icon="pi pi-plus" />
        </div>
      </form>
    </section>
  );
}
