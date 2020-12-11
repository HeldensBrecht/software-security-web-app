import React from "react";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import SelectInput from "../common/SelectInput";

export default function ProductForm({
  product,
  onChange,
  onSave,
  saving = false,
  errors = {},
}) {
  return (
    <form onSubmit={onSave}>
      <h2>{product.id ? "Edit" : "Add"} Product</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}

      <Input
        type="text"
        name="name"
        label="Name"
        value={product.name}
        onChange={onChange}
        error={errors.name}
      />

      <TextArea
        name="description"
        label="Description"
        value={product.description}
        onChange={onChange}
        error={errors.description}
      />

      <Input
        type="number"
        name="price"
        label="Price"
        value={product.price}
        onChange={onChange}
        error={errors.price}
      />

      <Input
        type="number"
        name="stock"
        label="Stock"
        value={product.stock}
        onChange={onChange}
        error={errors.stock}
      />

      <SelectInput
        name="category"
        label="Category"
        value={product.category || ""}
        // defaultOption="Select Category"
        defaultOption={product.category}
        options={[{ name: "vinyl" }, { name: "apparel" }].map((author) => ({
          value: author.name,
          text: author.name,
        }))}
        onChange={onChange}
        error={errors.category}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
