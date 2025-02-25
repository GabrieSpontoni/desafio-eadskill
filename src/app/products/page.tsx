/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [limit, setLimit] = useState(8);  
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (currentLimit: number) => {
    setLoading(true);
    try {
      const response = await fetch(`https://fakestoreapi.com/products?limit=${currentLimit}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(limit);
  }, [limit]);

  const handleLoadMore = () => {
    const newLimit = limit + 8; 
    setLimit(newLimit);
    fetchProducts(newLimit); 
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Lista de Produtos (Ver Mais)</h1>

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
              <p className="text-xs text-gray-600 italic">
                {product.category}
              </p>
            </div>
          ))}
        </div>
      )}

      {!loading && products.length > 0 && (
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
