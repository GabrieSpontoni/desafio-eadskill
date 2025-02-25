"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { ProductForm } from "@/components/ProductForm";

const createProductSchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .max(30, "Título não pode ultrapassar 30 caracteres."),
  price: z
    .number({ invalid_type_error: "O preço deve ser um número válido." })
    .nonnegative("Preço não pode ser negativo."),
  description: z.string().min(1, "Descrição é obrigatória."),
  category: z.string().min(1, "Categoria é obrigatória."),
  image: z.string().url("Imagem deve ser uma URL."),
});

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleCreate(values: z.infer<typeof createProductSchema>) {
    setLoading(true);
    try {
      await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      router.push("/products");
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <ProductForm
        initialValues={{
          title: "",
          price: 0,
          description: "",
          category: "",
          image: "",
        }}
        schema={createProductSchema}
        onSubmit={handleCreate}
        loading={loading}
        titleForm="Criar Produto"
      />
    </div>
  );
}
