import React from "react";
import { Eye, Users } from "lucide-react";

const UserInteractions = ({ interactions }) => {
  if (!interactions || interactions.length === 0) {
    return <div className="text-gray-500 text-sm">No recent activity yet.</div>;
  }

  return interactions.map((interaction, index) => {
    const isSignup =
      interaction.type === "signup" || interaction.type === "register";

    const icon = isSignup ? (
      <Users className="w-4 h-4 text-white" />
    ) : (
      <Eye className="w-4 h-4 text-white" />
    );

    const bgColor = isSignup ? "bg-blue-50" : "bg-green-50";
    const iconBg = isSignup ? "bg-blue-500" : "bg-green-500";

    return (
      <div
        key={index}
        className={`flex items-center justify-between p-3 ${bgColor} rounded-lg`}
      >
        <div className="flex items-center space-x-3">
          <div
            className={`w-8 h-8 ${iconBg} rounded-full flex items-center justify-center`}
          >
            {icon}
          </div>
          <div>
            <div className="font-medium text-gray-900">
              {interaction.type === "view" || interaction.type === "click"
                ? `Product ${interaction.type}ed: ${interaction.product?.name ?? "Unknown"}`
                : `New user ${interaction.type.replace("_", " ")}`}
            </div>
            <div className="text-sm text-gray-600">
              {new Date(interaction.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
        <div className="text-green-600 font-semibold">
          +Ksh {interaction.earnings}
        </div>
      </div>
    );
  });
};

export default UserInteractions;
