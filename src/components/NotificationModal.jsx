import React from "react";
import { X, CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react";

const NotificationModal = ({
  isVisible,
  onClose,
  type = "info", // 'success', 'error', 'warning', 'info'
  title,
  message,
  actionButton,
  autoClose = false,
  autoCloseDelay = 5000,
}) => {
  React.useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, isVisible, onClose]);

  if (!isVisible) return null;

  const getNotificationConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: <CheckCircle className="w-6 h-6" />,
          iconBgColor: "bg-green-100",
          iconTextColor: "text-green-600",
          borderColor: "border-green-200",
          bgColor: "bg-green-50",
          titleColor: "text-green-800",
          messageColor: "text-green-700",
          buttonColor: "bg-green-600 hover:bg-green-700",
        };
      case "error":
        return {
          icon: <XCircle className="w-6 h-6" />,
          iconBgColor: "bg-red-100",
          iconTextColor: "text-red-600",
          borderColor: "border-red-200",
          bgColor: "bg-red-50",
          titleColor: "text-red-800",
          messageColor: "text-red-700",
          buttonColor: "bg-red-600 hover:bg-red-700",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="w-6 h-6" />,
          iconBgColor: "bg-yellow-100",
          iconTextColor: "text-yellow-600",
          borderColor: "border-yellow-200",
          bgColor: "bg-yellow-50",
          titleColor: "text-yellow-800",
          messageColor: "text-yellow-700",
          buttonColor: "bg-yellow-600 hover:bg-yellow-700",
        };
      case "info":
      default:
        return {
          icon: <Info className="w-6 h-6" />,
          iconBgColor: "bg-blue-100",
          iconTextColor: "text-blue-600",
          borderColor: "border-blue-200",
          bgColor: "bg-blue-50",
          titleColor: "text-blue-800",
          messageColor: "text-blue-700",
          buttonColor: "bg-blue-600 hover:bg-blue-700",
        };
    }
  };

  const config = getNotificationConfig();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 ${config.iconBgColor} rounded-full flex items-center justify-center`}
            >
              <span className={config.iconTextColor}>{config.icon}</span>
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${config.titleColor}`}>
                {title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div
            className={`${config.bgColor} ${config.borderColor} border rounded-lg p-4 mb-6`}
          >
            <p className={`${config.messageColor} text-sm leading-relaxed`}>
              {message}
            </p>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Close
            </button>
            {actionButton && (
              <button
                onClick={actionButton.onClick}
                className={`flex-1 px-4 py-3 ${config.buttonColor} text-white rounded-lg transition-colors font-medium`}
              >
                {actionButton.text}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Toast notification variant for non-blocking notifications
export const ToastNotification = ({
  isVisible,
  onClose,
  type = "info",
  title,
  message,
  position = "top-right", // 'top-right', 'top-left', 'bottom-right', 'bottom-left'
  autoClose = true,
  autoCloseDelay = 4000,
}) => {
  React.useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, isVisible, onClose]);

  if (!isVisible) return null;

  const getNotificationConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          iconColor: "text-green-500",
          bgColor: "bg-white",
          borderColor: "border-green-200",
          titleColor: "text-green-800",
          messageColor: "text-green-600",
        };
      case "error":
        return {
          icon: <XCircle className="w-5 h-5" />,
          iconColor: "text-red-500",
          bgColor: "bg-white",
          borderColor: "border-red-200",
          titleColor: "text-red-800",
          messageColor: "text-red-600",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="w-5 h-5" />,
          iconColor: "text-yellow-500",
          bgColor: "bg-white",
          borderColor: "border-yellow-200",
          titleColor: "text-yellow-800",
          messageColor: "text-yellow-600",
        };
      case "info":
      default:
        return {
          icon: <Info className="w-5 h-5" />,
          iconColor: "text-blue-500",
          bgColor: "bg-white",
          borderColor: "border-blue-200",
          titleColor: "text-blue-800",
          messageColor: "text-blue-600",
        };
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case "top-left":
        return "top-4 left-4";
      case "bottom-right":
        return "bottom-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "top-right":
      default:
        return "top-4 right-4";
    }
  };

  const config = getNotificationConfig();

  return (
    <div className={`fixed ${getPositionClasses()} z-50 max-w-sm w-full`}>
      <div
        className={`${config.bgColor} ${config.borderColor} border rounded-lg shadow-lg p-4 transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-start space-x-3">
          <span className={config.iconColor}>{config.icon}</span>
          <div className="flex-1 min-w-0">
            {title && (
              <h4 className={`text-sm font-medium ${config.titleColor} mb-1`}>
                {title}
              </h4>
            )}
            <p className={`text-sm ${config.messageColor}`}>{message}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
