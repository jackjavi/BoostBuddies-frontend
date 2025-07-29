import { Eye, Star, Grid3X3, List } from "lucide-react";
import React, { useEffect, useState, useCallback, useContext } from "react";
import MobileNavBottom from "./MobileNavBottomProducts";
import { AuthContext } from "../context/AuthContextWrapper";
import {
  fetchProducts,
  fetchProductCategories,
  trackProductView,
  trackProductClick,
} from "../api/api2";
import Spinner from "./Spinner";

export default function ProductsComponent() {
  const { user } = useContext(AuthContext);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([{ id: "all", name: "All" }]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProducts({
        page: pagination.page,
        limit: 12,
        category: selectedCategory !== "all" ? selectedCategory : undefined,
      });
      setProducts(data.products);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, selectedCategory]);

  const loadCategories = useCallback(async () => {
    try {
      const fetched = await fetchProductCategories();
      const formatted = fetched.map((cat) => ({
        id: cat.toLowerCase().replace(/\s+/g, "-"),
        name: cat,
      }));
      setCategories([{ id: "all", name: "All" }, ...formatted]);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <div className="min-h-screen bg-gray-50 rounded-xl">
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl text-center font-bold text-gray-900 mb-2">
            Products
          </h1>
          <p className="text-gray-600 text-center">
            Browse and promote products to earn commissions
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedCategory === category.id
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            Showing page {pagination.page} of {pagination.totalPages}
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${
                viewMode === "grid" ? "bg-purple-600 text-white" : "bg-gray-100"
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg ${
                viewMode === "list" ? "bg-purple-600 text-white" : "bg-gray-100"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Cards */}
        {loading ? (
          <Spinner />
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500">No products found.</div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm border hover:shadow-md transition"
              >
                {product.isFeatured && (
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium px-3 py-1 rounded-t-xl">
                    Featured
                  </div>
                )}
                <div className="p-6">
                  <img
                    src={product.imageUrl || "/api/placeholder/300/200"}
                    alt={product.name}
                    className="rounded-lg mb-4 w-full aspect-video object-cover bg-gray-100"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {product.category}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-sm text-yellow-600">
                      <Star className="w-4 h-4" /> {product.averageRating}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Eye className="w-4 h-4" /> {product.totalViews}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 font-medium">
                        Earn Ksh {product.earningsPerView}
                      </p>
                    </div>
                    <button
                      onClick={async () => {
                        await trackProductView(product.id, user.id);
                        trackProductClick(product.id, user.id);
                      }}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border divide-y">
            {products.map((product) => (
              <div key={product.id} className="flex p-4 gap-4 items-center">
                <img
                  src={product.imageUrl || "/api/placeholder/100/100"}
                  alt={product.name}
                  className="w-20 h-20 rounded-lg object-cover bg-gray-100"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600">{product.category}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" /> $
                      {product.averageRating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" /> ${product.totalViews}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600">
                    Earn ${product.earningsPerView}
                  </p>
                </div>
                <button
                  onClick={async () => {
                    await trackProductView(product.id, user.id);
                    trackProductClick(product.id, user.id);
                  }}
                  className="ml-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="mt-8 flex justify-center space-x-2">
          <button
            onClick={() =>
              setPagination((p) => ({ ...p, page: Math.max(1, p.page - 1) }))
            }
            disabled={pagination.page === 1}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setPagination((p) => ({
                ...p,
                page: Math.min(p.totalPages, p.page + 1),
              }))
            }
            disabled={pagination.page >= pagination.totalPages}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>

      <MobileNavBottom />
      <div className="md:hidden h-20" />
    </div>
  );
}
