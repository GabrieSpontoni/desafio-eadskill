"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "../hooks/useProducts";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isHighlight = product.rating.rate > 4.5;
  return (
    <div
      className={`p-4 flex flex-col items-center rounded border ${
        isHighlight ? "bg-yellow-700 border-yellow-400" : "bg-gray-800 border-gray-700"
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
      <p className="text-sm mb-1">Rating: {product.rating.rate.toFixed(1)}</p>
      <p className="text-xs italic mb-2">{product.category}</p>
      <Link
        href={`/products/${product.id}`}
        className="text-xs bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
      >
        Detalhes
      </Link>
    </div>
  );
}
