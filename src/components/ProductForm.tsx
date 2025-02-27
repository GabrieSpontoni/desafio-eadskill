"use client";

import React, { FormEvent, useState } from "react";
import { z } from "zod";

type BaseProductFormValues = {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

interface ProductFormProps<T extends BaseProductFormValues> {
  initialValues: T;
  schema: z.ZodSchema<T>;
  onSubmit: (values: T) => Promise<void>;
  loading?: boolean;
  titleForm?: string;
  disabledCategoryField?: boolean;
}

export function ProductForm<T extends BaseProductFormValues>({
  initialValues,
  schema,
  onSubmit,
  loading,
  titleForm = "Formulário",
  disabledCategoryField = false
}: ProductFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<string[]>([]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors([]);

    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const issues = parsed.error.issues.map((issue) => issue.message);
      setErrors(issues);
      return;
    }

    await onSubmit(parsed.data);
  }

  return (
    <div className="max-w-md w-full bg-gray-800 p-6 rounded border border-gray-700 relative">
      <div className="bg-orange-600 text-white text-sm rounded p-2 mb-4 font-semibold">
        Atenção: as operações de criação/edição não são persistidas
        permanentemente.
      </div>

      <h1 className="text-xl font-bold mb-4 text-center">{titleForm}</h1>

      {errors.length > 0 && (
        <div className="bg-red-600 text-white text-sm rounded p-2 mb-4">
          {errors.map((err, idx) => (
            <p key={idx}>• {err}</p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-medium mb-1">
            Título
          </label>
          <input
            id="title"
            className="border border-gray-600 bg-gray-700 p-2 rounded text-gray-100"
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="price" className="text-sm font-medium mb-1">
            Preço
          </label>
          <input
            id="price"
            className="border border-gray-600 bg-gray-700 p-2 rounded text-gray-100"
            type="number"
            step="0.01"
            name="price"
            value={values.price}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium mb-1">
            Descrição
          </label>
          <textarea
            id="description"
            className="border border-gray-600 bg-gray-700 p-2 rounded text-gray-100"
            name="description"
            rows={3}
            value={values.description}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="category" className="text-sm font-medium mb-1">
            Categoria
          </label>
          <input
            id="category"
            className="border border-gray-600 bg-gray-700 p-2 rounded text-gray-100 disabled:cursor-not-allowed"
            name="category"
            value={values.category ?? ""}
            onChange={handleChange}
            disabled={disabledCategoryField}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="image" className="text-sm font-medium mb-1">
            URL da Imagem
          </label>
          <input
            id="image"
            className="border border-gray-600 bg-gray-700 p-2 rounded text-gray-100"
            type="text"
            name="image"
            value={values.image}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 py-2 px-4 rounded hover:bg-blue-700"
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}
