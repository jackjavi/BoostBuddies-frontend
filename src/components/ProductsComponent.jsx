import { Eye, Star, Grid3X3, List, Lock, Clock, Zap } from "lucide-react";
import React, { useEffect, useState, useCallback, useContext } from "react";
import MobileNavBottom from "./MobileNavBottomProducts";
import { AuthContext } from "../context/AuthContextWrapper";
import {
  fetchProductsWithAccessControl,
  fetchProductCategories,
  trackProductViewWithControl,
  trackProductClick,
  getUserViewingStats,
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
  const [userAccess, setUserAccess] = useState({
    packageName: "Free User",
    remainingViews: 0,
  });
  const [viewingStats, setViewingStats] = useState({
    dailyStats: [],
    currentAccess: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProductsWithAccessControl({
        page: pagination.page,
        limit: 12,
        category: selectedCategory !== "all" ? selectedCategory : undefined,
      });
      setProducts(data.products);
      setPagination(data.pagination);
      setUserAccess(data.userAccess);
    } catch (error) {
      console.error("Failed to load products:", error);
      setError(error.message || "Failed to load products");
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

  const loadViewingStats = useCallback(async () => {
    try {
      const stats = await getUserViewingStats();
      setViewingStats(stats);
    } catch (error) {
      console.error("Failed to load viewing stats:", error);
    }
  }, []);

  useEffect(() => {
    loadCategories();
    loadViewingStats();
  }, [loadCategories, loadViewingStats]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleProductView = async (product) => {
    try {
      setError(null);

      // Track the view with access control
      const result = await trackProductViewWithControl(product.id, user.id);

      // Update remaining views
      setUserAccess((prev) => ({
        ...prev,
        remainingViews: result.remainingViews,
      }));

      // Refresh products to remove viewed product from list
      await loadProducts();
      await loadViewingStats();

      // Show success message
      alert(
        `Great! You earned Ksh ${result.earnedAmount}. Remaining views today: ${result.remainingViews}`
      );

      // Redirect to external link if it exists
      if (product.externalLink) {
        // Track click for analytics
        trackProductClick(product.id, user.id);
      }
    } catch (error) {
      console.error("Failed to track product view:", error);
      setError(error.message || "Failed to view product");
    }
  };

  const getPackageGradient = (packageName) => {
    switch (packageName) {
      case "Genz Package":
        return "from-yellow-400 to-yellow-500";
      case "Mbogi Package":
        return "from-gray-500 to-gray-600";
      case "Baller Package":
        return "from-orange-500 to-orange-600";
      case "Comrade Package":
        return "from-purple-500 to-purple-600";
      default:
        return "from-blue-500 to-blue-600";
    }
  };

  return (
    <div className="min-h-screen rounded-xl">
      <main className="max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl text-center font-lilita text-gray-900 mb-2">
            Products
          </h1>
          <p className="text-gray-600 text-center">
            Browse and promote products to earn commissions
          </p>
        </div>

        {/* User Access Status Card */}
        <div
          className={`bg-gradient-to-r ${getPackageGradient(userAccess.packageName)} rounded-xl p-4 mb-6 text-white`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">
                {userAccess.packageName}
              </h3>
              <p className="text-sm opacity-90">
                Daily Views Remaining: {userAccess.remainingViews}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-6 h-6" />
              <Eye className="w-6 h-6" />
            </div>
          </div>

          {userAccess.remainingViews === 0 && (
            <div className="mt-3 p-3 bg-black bg-opacity-20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">
                  Daily limit reached. Reset at midnight or upgrade your package
                  for more views!
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 text-red-800">
              <span className="font-medium">Error:</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Daily Stats Summary */}
        {viewingStats.dailyStats.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">
              Recent Activity
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  Ksh{" "}
                  {viewingStats.dailyStats.reduce(
                    (sum, day) => sum + day.totalEarned,
                    0
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  Total Earned (7 days)
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {viewingStats.dailyStats.reduce(
                    (sum, day) => sum + day.viewCount,
                    0
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  Products Viewed (7 days)
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {viewingStats.dailyStats[0]?.viewCount || 0}
                </div>
                <div className="text-sm text-gray-600">Views Today</div>
              </div>
            </div>
          </div>
        )}

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
          <div className="text-center text-gray-500 py-12">
            <Eye className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">
              No more products available
            </h3>
            <p className="text-sm">
              {userAccess.remainingViews === 0
                ? "You've reached your daily view limit. Try again tomorrow or upgrade your package!"
                : "You've viewed all available products for your package level today."}
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm border hover:shadow-md transition"
              >
                {product.isFeatured && (
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium px-3 py-1 rounded-t-xl">
                    Featured ⭐
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
                      {product.priority > 0 && (
                        <p className="text-xs text-blue-600">
                          Priority {product.priority}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleProductView(product)}
                      disabled={userAccess.remainingViews === 0}
                      className={`px-4 py-2 rounded-lg transition ${
                        userAccess.remainingViews === 0
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-purple-600 text-white hover:bg-purple-700"
                      }`}
                    >
                      {userAccess.remainingViews === 0 ? (
                        <Lock className="w-4 h-4" />
                      ) : (
                        "View & Earn"
                      )}
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
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    {product.isFeatured && (
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                    {product.priority > 0 && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        Priority {product.priority}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{product.category}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {product.averageRating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {product.totalViews}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600 font-medium">
                    Earn Ksh {product.earningsPerView}
                  </p>
                </div>
                <button
                  onClick={() => handleProductView(product)}
                  disabled={userAccess.remainingViews === 0}
                  className={`ml-4 px-4 py-2 rounded-lg transition ${
                    userAccess.remainingViews === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}
                >
                  {userAccess.remainingViews === 0 ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    "View & Earn"
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {pagination.totalPages > 1 && (
          <div className="mt-8 flex justify-center space-x-2">
            <button
              onClick={() =>
                setPagination((p) => ({ ...p, page: Math.max(1, p.page - 1) }))
              }
              disabled={pagination.page === 1}
              className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex items-center space-x-1">
              {Array.from(
                { length: Math.min(5, pagination.totalPages) },
                (_, i) => {
                  let pageNum;
                  if (pagination.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (pagination.page <= 3) {
                    pageNum = i + 1;
                  } else if (pagination.page >= pagination.totalPages - 2) {
                    pageNum = pagination.totalPages - 4 + i;
                  } else {
                    pageNum = pagination.page - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() =>
                        setPagination((p) => ({ ...p, page: pageNum }))
                      }
                      className={`px-3 py-2 rounded-lg text-sm ${
                        pagination.page === pageNum
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
              )}
            </div>

            <button
              onClick={() =>
                setPagination((p) => ({
                  ...p,
                  page: Math.min(p.totalPages, p.page + 1),
                }))
              }
              disabled={pagination.page >= pagination.totalPages}
              className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        {/* Package Upgrade Prompt */}
        {userAccess.remainingViews === 0 && (
          <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
            <div className="text-center">
              <Lock className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Daily View Limit Reached
              </h3>
              <p className="text-gray-600 mb-4">
                You've used all your daily product views with the{" "}
                {userAccess.packageName}. Upgrade to a higher package for more
                daily views and better earnings!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
                  Upgrade Package
                </button>
                <button className="border border-purple-600 text-purple-600 px-6 py-2 rounded-lg hover:bg-purple-50 transition">
                  View Packages
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Today's Summary */}
        {viewingStats.currentAccess && (
          <div className="mt-6 bg-white rounded-xl shadow-sm border p-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              Today's Summary
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">
                  Ksh {viewingStats.dailyStats[0]?.totalEarned || 0}
                </div>
                <div className="text-xs text-gray-600">Earned Today</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">
                  {viewingStats.dailyStats[0]?.viewCount || 0}
                </div>
                <div className="text-xs text-gray-600">Products Viewed</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600">
                  {userAccess.remainingViews}
                </div>
                <div className="text-xs text-gray-600">Views Remaining</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-orange-600">
                  {viewingStats.currentAccess?.dailyLimit || 0}
                </div>
                <div className="text-xs text-gray-600">Daily Limit</div>
              </div>
            </div>
          </div>
        )}
      </main>

      <MobileNavBottom />
      <div className="md:hidden h-20" />
    </div>
  );
}
