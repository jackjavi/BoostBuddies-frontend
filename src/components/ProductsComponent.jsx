import {
  Search,
  Eye,
  Star,
  ShoppingCart,
  Package,
  Grid3X3,
  List,
} from "lucide-react";
import React, { useState } from "react";
import MobileNavBottom from "./MobileNavBottomProducts";

export default function ProductsComponent() {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Products", count: 324 },
    { id: "electronics", name: "Electronics", count: 156 },
    { id: "fashion", name: "Fashion", count: 89 },
    { id: "home", name: "Home & Garden", count: 45 },
    { id: "sports", name: "Sports", count: 34 },
  ];

  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      category: "Electronics",
      price: 1199,
      earnings: 24,
      views: 1250,
      rating: 4.8,
      image: "/api/placeholder/300/200",
      featured: true,
    },
    {
      id: 2,
      name: "MacBook Pro M3",
      category: "Electronics",
      price: 1999,
      earnings: 40,
      views: 890,
      rating: 4.9,
      image: "/api/placeholder/300/200",
      featured: false,
    },
    {
      id: 3,
      name: "Nike Air Max 270",
      category: "Fashion",
      price: 150,
      earnings: 8,
      views: 650,
      rating: 4.6,
      image: "/api/placeholder/300/200",
      featured: false,
    },
    {
      id: 4,
      name: "Samsung Galaxy S24",
      category: "Electronics",
      price: 899,
      earnings: 18,
      views: 720,
      rating: 4.7,
      image: "/api/placeholder/300/200",
      featured: true,
    },
    {
      id: 5,
      name: "Sony WH-1000XM5",
      category: "Electronics",
      price: 399,
      earnings: 12,
      views: 480,
      rating: 4.8,
      image: "/api/placeholder/300/200",
      featured: false,
    },
    {
      id: 6,
      name: "Adidas Ultraboost 22",
      category: "Fashion",
      price: 180,
      earnings: 9,
      views: 320,
      rating: 4.5,
      image: "/api/placeholder/300/200",
      featured: false,
    },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product) => product.category.toLowerCase() === selectedCategory
        );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">
            Browse and promote products to earn commissions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-gray-900">324</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Your Views</p>
                <p className="text-2xl font-bold text-gray-900">1,250</p>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg. Earnings
                </p>
                <p className="text-2xl font-bold text-gray-900">$18.5</p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Top Category
                </p>
                <p className="text-2xl font-bold text-gray-900">Tech</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg ${
                  viewMode === "grid"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg ${
                  viewMode === "list"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow"
              >
                {product.featured && (
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium px-3 py-1 rounded-t-xl">
                    Featured
                  </div>
                )}
                <div className="p-6">
                  <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <Package className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {product.category}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">
                        {product.rating}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {product.views}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        ${product.price}
                      </p>
                      <p className="text-sm text-green-600 font-medium">
                        Earn ${product.earnings}
                      </p>
                    </div>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`p-6 ${index !== filteredProducts.length - 1 ? "border-b" : ""}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {product.name}
                      </h3>
                      {product.featured && (
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {product.category}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{product.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span>{product.views} views</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">
                      ${product.price}
                    </p>
                    <p className="text-sm text-green-600 font-medium">
                      Earn ${product.earnings}
                    </p>
                  </div>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Mobile Navigation */}
      <MobileNavBottom />

      {/* Mobile bottom padding */}
      <div className="md:hidden h-20"></div>
    </div>
  );
}
