"use client";

import { useState } from "react";

export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchCategories() {
    setLoading(true);
    try {
      const res = await fetch("https://fakestoreapi.com/products/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchProducts(currentLimit: number, category: string, order: string) {
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
  }

  return {
    products,
    categories,
    loading,
    fetchCategories,
    fetchProducts
  };
}
