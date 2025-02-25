"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import { ProductForm } from "@/components/ProductForm";

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

const updateProductSchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .max(30, "Título deve ter no máximo 30 caracteres"),
  price: z
    .number({ invalid_type_error: "Preço deve ser um número" })
    .nonnegative("Preço não pode ser negativo"),
  description: z.string().min(1, "Descrição é obrigatória"),
  image: z.string().url("Imagem deve ser uma URL"),
  category: z.string().min(1, "Categoria é obrigatória"),
});

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams() as { id: string };

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id);
    }
  }, [params.id]);

  async function fetchProduct(id: string) {
    setLoading(true);
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data: Product = await response.json();
      setProduct(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(values: z.infer<typeof updateProductSchema>) {
    if (!product) return;
    setLoading(true);
    try {
      await fetch(`https://fakestoreapi.com/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, category: product.category }),
      });
      router.push("/products");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!product) return;
    setLoading(true);
    try {
      await fetch(`https://fakestoreapi.com/products/${product.id}`, {
        method: "DELETE",
      });
      router.push("/products");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setDeleteModalOpen(false);
    }
  }

  if (loading && !product) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        Produto não encontrado.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 p-6 rounded w-80">
            <h2 className="text-lg font-bold mb-4">Confirmar Exclusão</h2>
            <p className="mb-6">Tem certeza que deseja excluir este produto?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      <ProductForm
        initialValues={{
          title: product.title,
          price: product.price,
          description: product.description,
          image: product.image,
          category: product.category,
        }}
        schema={updateProductSchema}
        onSubmit={handleUpdate}
        loading={loading}
        titleForm="Editar Produto"
        disabledCategoryField={true}
      />

      <div className="absolute bottom-8 right-8">
        {!deleteModalOpen && (
          <button
            onClick={() => setDeleteModalOpen(true)}
            disabled={loading}
            className="bg-red-600 py-2 px-4 rounded hover:bg-red-700"
          >
            Excluir
          </button>
        )}
      </div>
    </div>
  );
}
