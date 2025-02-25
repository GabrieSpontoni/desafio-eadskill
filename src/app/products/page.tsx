"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [limit, setLimit] = useState<number>(8);
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("");

  const fetchCategories = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProducts = async (
    currentLimit: number,
    category: string,
    order: string
  ) => {
    setLoading(true);
    try {
      let url = `https://fakestoreapi.com/products?limit=${currentLimit}&sort=asc`;
      if (category !== "all") {
        url = `https://fakestoreapi.com/products/category/${category}?limit=${currentLimit}`;
      }
      const response = await fetch(url);
      const data: Product[] = await response.json();
      if (order === "asc") data.sort((a, b) => a.price - b.price);
      if (order === "desc") data.sort((a, b) => b.price - a.price);
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts(limit, selectedCategory, sortOrder);
  }, [limit, selectedCategory, sortOrder]);

  const handleLoadMore = () => {
    setLimit((prev) => prev + 8);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

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
            {products.map((product) => {
              const isHighlight = product.rating.rate > 4.5;
              return (
                <div
                  key={product.id}
                  className={`p-4 flex flex-col items-center rounded border ${
                    isHighlight
                      ? "bg-yellow-700 border-yellow-400"
                      : "bg-gray-800 border-gray-700"
                  }`}
                >
                  {isHighlight && (
                    <span className="mb-2 text-xs font-semibold text-gray-100">
                      Destaque
                    </span>
                  )}
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={150}
                    height={150}
                    className="object-contain mb-2"
                  />
                  <h2 className="font-semibold text-center text-sm mb-1">
                    {product.title.length > 30
                      ? product.title.slice(0, 30) + "..."
                      : product.title}
                  </h2>
                  <p className="text-sm mb-1">$ {product.price.toFixed(2)}</p>
                  <p className="text-sm mb-1">
                    Rating: {product.rating.rate.toFixed(1)}
                  </p>
                  <p className="text-xs italic mb-2">{product.category}</p>
                  <Link
                    href={`/products/${product.id}`}
                    className="text-xs bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Detalhes
                  </Link>
                </div>
              );
            })}
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
