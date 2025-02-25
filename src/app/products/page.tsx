"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";

export default function ProductsPage() {
  const { products, categories, loading, fetchCategories, fetchProducts } =
    useProducts();

  const [limit, setLimit] = useState<number>(8);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("");

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts(limit, selectedCategory, sortOrder);
  }, [limit, selectedCategory, sortOrder]);

  function handleLoadMore() {
    setLimit((prev) => prev + 8);
  }

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedCategory(e.target.value);
  }

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSortOrder(e.target.value);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Lista de Produtos</h1>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center gap-4 mb-6 justify-center">
          <div className="relative inline-block w-60">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="block w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 pr-8 text-gray-100"
            >
              <option value="all">Todas as categorias</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="relative inline-block w-44">
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="block w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 pr-8 text-gray-100"
            >
              <option value="">Nenhum</option>
              <option value="asc">Menor preço</option>
              <option value="desc">Maior preço</option>
            </select>
          </div>
          <Link
            href="/products/create"
            className="bg-green-600 px-3 py-2 rounded hover:bg-green-700 text-sm"
          >
            Criar Produto
          </Link>
        </div>

        {loading && <p className="text-center">Carregando...</p>}

        {!loading && products.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!loading && products.length > 0 && selectedCategory === "all" && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              Ver mais
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
