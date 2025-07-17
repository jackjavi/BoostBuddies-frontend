import React, { useEffect, useContext } from "react";
import { LogsContext } from "../context/LogsContextWrapper";
import { FiRefreshCw } from "react-icons/fi";
import dayjs from "dayjs";
import AsideBar from "./AsideBar";

const SystemLogsTable = () => {
  const {
    logs,
    isLoadingLogs,
    error,
    retrieveLogs,
    handleNextPage,
    handlePrevPage,
    setFilters,
    page,
    totalPages,
  } = useContext(LogsContext);

  useEffect(() => {
    retrieveLogs(page);
  }, [page, retrieveLogs]);

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden md:pt-36 pt-16">
      <div className="max-w-7xl mx-auto flex">
        <AsideBar />

        <div className="bg-gray-50 flex-1 p-4 rounded-xl md:h-[75vh] h-full overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-indigo-800">
                System Logs
              </h1>
              <button
                onClick={() => retrieveLogs(page)}
                className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
              >
                <FiRefreshCw className="text-lg" />
                <span>Refresh</span>
              </button>
            </div>

            {/* Filters */}
            <div className=" space-x-4 mb-4 flex ">
              <div className="flex justify-between">
                <div>
                  <input
                    type="text"
                    placeholder="Filter by name"
                    className="border p-2 rounded-md"
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                  <input
                    type="text"
                    placeholder="Filter by email"
                    className="border p-2 rounded-md"
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                  <input
                    type="text"
                    placeholder="Filter by action"
                    className="border p-2 rounded-md"
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        action: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <select
                    className="border p-2 rounded-md"
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        sortBy: e.target.value,
                      }))
                    }
                  >
                    <option value="id">Sort by ID</option>
                    <option value="name">Sort by Name</option>
                    <option value="email">Sort by Email</option>
                  </select>
                  <select
                    className="border p-2 rounded-md"
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        sortOrder: e.target.value,
                      }))
                    }
                  >
                    <option value="ASC">Ascending</option>
                    <option value="DESC">Descending</option>
                  </select>{" "}
                  <button
                    onClick={retrieveLogs}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>

            {isLoadingLogs ? (
              <div className="text-center py-10 text-gray-600">Loading...</div>
            ) : error ? (
              <div className="text-center py-10 text-red-600">{error}</div>
            ) : (
              <>
                <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-lg">
                  <table className="table-auto w-full text-left">
                    <thead className="bg-indigo-100">
                      <tr>
                        <th className="px-4 py-2 text-indigo-800">Timestamp</th>
                        <th className="px-4 py-2 text-indigo-800">User</th>
                        <th className="px-4 py-2 text-indigo-800">Email</th>
                        <th className="px-4 py-2 text-indigo-800">Role</th>
                        <th className="px-4 py-2 text-indigo-800">Action</th>
                        <th className="px-4 py-2 text-indigo-800">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {logs.map((log, index) => (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } hover:bg-indigo-50 transition-colors duration-200`}
                        >
                          <td className="px-4 py-2">
                            {dayjs(log.timestamp).format("YYYY-MM-DD HH:mm:ss")}
                          </td>
                          <td className="px-4 py-2">{log.User.name}</td>
                          <td className="px-4 py-2">{log.User.email}</td>
                          <td className="px-4 py-2 capitalize">
                            {log.User.role.name}
                          </td>
                          <td className="px-4 py-2">
                            {log.ActivityLog.action}
                          </td>
                          <td className="px-4 py-2">
                            {log.ActivityLog.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="block md:hidden space-y-4">
                  {logs.map((log, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
                    >
                      <p className="text-gray-600 text-sm">
                        <span className="font-bold">Timestamp:</span>{" "}
                        {dayjs(log.timestamp).format("YYYY-MM-DD HH:mm:ss")}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-bold">User:</span> {log.User.name}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-bold">Email:</span>{" "}
                        {log.User.email}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-bold">Role:</span>{" "}
                        {log.User.role.name}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-bold">Action:</span>{" "}
                        {log.ActivityLog.action}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-bold">Description:</span>{" "}
                        {log.ActivityLog.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <button
                    disabled={page === 1}
                    onClick={handlePrevPage}
                    className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 ${
                      page === 1 && "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    Previous Page
                  </button>
                  <span className="text-gray-600">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    disabled={page === totalPages}
                    onClick={handleNextPage}
                    className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 ${
                      page === totalPages && "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    Next Page
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemLogsTable;
