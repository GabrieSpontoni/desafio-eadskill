"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

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

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [limit, setLimit] = useState<number>(8);
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("asc");

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
      let url = `https://fakestoreapi.com/products?limit=${currentLimit}`;
      if (category !== "all") {
        url = `https://fakestoreapi.com/products/category/${category}?limit=${currentLimit}`;
      }
      const response = await fetch(url);
      const data: Product[] = await response.json();
      if (order === "asc") {
        data.sort((a, b) => a.price - b.price);
      } else {
        data.sort((a, b) => b.price - a.price);
      }
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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Lista de Produtos (Ver Mais + Filtro)
      </h1>

      <div className="flex items-center gap-4 mb-4">
        <div className="relative inline-block w-60">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="block w-full bg-white border border-gray-300 rounded px-4 py-2 pr-8 text-gray-700"
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
            className="block w-full bg-white border border-gray-300 rounded px-4 py-2 pr-8 text-gray-700"
          >
            <option value="asc">Menor preço</option>
            <option value="desc">Maior preço</option>
          </select>
        </div>
      </div>

      {loading && <p>Carregando...</p>}

      {!loading && products.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 flex flex-col items-center rounded"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={150}
                height={150}
                className="object-contain mb-2"
              />
              <h2 className="font-semibold text-center text-sm mb-1">
                {product.title}
              </h2>
              <p className="text-gray-500 text-sm mb-1">
                $ {product.price.toFixed(2)}
              </p>
              <p className="text-xs text-gray-600 italic">{product.category}</p>
            </div>
          ))}
        </div>
      )}

      {!loading && products.length > 0 && selectedCategory === "all" && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Ver mais
          </button>
        </div>
      )}
    </div>
  );
}
