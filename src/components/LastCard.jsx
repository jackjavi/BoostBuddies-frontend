import React, { useState, useEffect } from "react";
import axios from "axios";

const LastCard = ({ userId }) => {
  const [recentActivity, setRecentActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/recent-activity/${userId}`
        );
        setRecentActivity(response.data.recentActivity);
      } catch (err) {
        setError("Error fetching activity" || err.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentActivity();
  }, [userId]);

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 h-64 w-80 flex flex-col items-center justify-center">
        <p className="text-lg font-medium">Loading recent activity...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 h-64 w-80 flex flex-col items-center justify-center">
        <p className="text-lg font-medium text-red-500">
          No recent activity available
        </p>
      </div>
    );
  }

  if (!recentActivity) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 h-64 w-80 flex flex-col items-center justify-center">
        <p className="text-lg font-medium">No recent activity available</p>
      </div>
    );
  }

  return (
    <div
      className="bg-white border border-indigo-200 text-indigo-800 rounded-xl shadow-lg p-8 h-64 w-80 flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-slide-up"
      style={{ animationDelay: "0.1s" }}
    >
      <h3 className="text-lg font-semibold uppercase tracking-wider mb-4">
        Recent Activity
      </h3>
      <p className="text-xl font-medium">Action: {recentActivity.action}</p>
      <p className="text-md text-gray-600">
        Description: {recentActivity.description}
      </p>
      <p className="text-md text-gray-600">
        Time: {new Date(recentActivity.timestamp).toLocaleString()}
      </p>
      <div className="mt-4 bg-blue-800 text-white px-3 py-1 rounded-full font-medium text-sm shadow-md">
        Live Stats
      </div>
    </div>
  );
};

export default LastCard;
