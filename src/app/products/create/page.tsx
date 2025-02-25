"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface ProductInput {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function CreateProductPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.length > 30) {
      alert("O título não pode ter mais de 30 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const productData: ProductInput = {
        title,
        price,
        description,
        category,
        image
      };

      await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
      });

      router.push("/products");
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 p-6 rounded border border-gray-700 relative">
        <div className="bg-orange-600 text-white text-sm rounded p-2 mb-4 font-semibold">
          Atenção: as operações de criação, edição e exclusão não são
          persistidas permanentemente, pois a API é apenas para testes.
        </div>

        <h1 className="text-xl font-bold mb-4 text-center">Criar Produto</h1>
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Título</label>
            <input
              className="border border-gray-600 bg-gray-700 p-2 rounded text-gray-100"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex.: Novo Produto"
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
              placeholder="Ex.: 99.90"
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
              placeholder="Ex.: Detalhes do produto..."
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Categoria</label>
            <input
              className="border border-gray-600 bg-gray-700 p-2 rounded text-gray-100"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder='Ex.: "electronics"'
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">URL da Imagem</label>
            <input
              className="border border-gray-600 bg-gray-700 p-2 rounded text-gray-100"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Ex.: https://..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 py-2 px-4 rounded hover:bg-blue-700"
          >
            {loading ? "Criando..." : "Criar Produto"}
          </button>
        </form>
      </div>
    </div>
  );
}
