"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

export default function ProductEditPage() {
  const router = useRouter();
  const params = useParams() as { id: string };

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id);
    }
  }, [params.id]);

  const fetchProduct = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data: Product = await response.json();
      setProduct(data);
      setTitle(data.title);
      setPrice(data.price);
      setDescription(data.description);
      setImage(data.image);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setLoading(true);
    try {
      await fetch(`https://fakestoreapi.com/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          price,
          description,
          image,
          category: product.category
        })
      });
      router.push("/products");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    if (!product) return;
    setLoading(true);
    try {
      await fetch(`https://fakestoreapi.com/products/${product.id}`, {
        method: "DELETE"
      });
      router.push("/products");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

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
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 p-6 rounded w-80">
            <h2 className="text-lg font-bold mb-4">Confirmar Exclusão</h2>
            <p className="mb-6">Tem certeza que deseja excluir este produto?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeDeleteModal}
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

      <div className="max-w-md w-full bg-gray-800 p-6 rounded border border-gray-700 relative">
        <div className="bg-orange-600 text-white text-sm rounded p-2 mb-4 font-semibold">
          Atenção: as operações de criação, edição e exclusão não são
          persistidas permanentemente, pois a API é apenas para testes.
        </div>

        <h1 className="text-xl font-bold mb-4 text-center">Editar Produto</h1>
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Título</label>
            <input
              className="border border-gray-600 bg-gray-700 p-2 rounded text-gray-100"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={30}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Preço</label>
            <input
              className="border border-gray-600 bg-gray-700 p-2 rounded text-gray-100"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Descrição</label>
            <textarea
              className="border border-gray-600 bg-gray-700 p-2 rounded text-gray-100"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">
              Categoria (não editável)
            </label>
            <input
              className="border border-gray-600 bg-gray-700 p-2 rounded cursor-not-allowed text-gray-100"
              type="text"
              value={product.category}
              disabled
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">URL da Imagem</label>
            <input
              className="border border-gray-600 bg-gray-700 p-2 rounded text-gray-100"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 py-2 px-4 rounded hover:bg-blue-700"
            >
              {loading ? "Atualizando..." : "Salvar Alterações"}
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={openDeleteModal}
              className="bg-red-600 py-2 px-4 rounded hover:bg-red-700"
            >
              Excluir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
