import { createContext, useState, useEffect, useCallback } from "react";
import { fetchSystemWideLogs } from "../api/api";

export const LogsContext = createContext();

function LogsContextWrapper({ children }) {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLogs, setTotalLogs] = useState(0);
  const [isLoadingLogs, setIsLoadingLogs] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    role: "",
    action: "",
    limit: 5,
  });

  const retrieveLogs = useCallback(
    async (pageToFetch = page) => {
      setIsLoadingLogs(true);
      try {
        const logsData = await fetchSystemWideLogs(pageToFetch, filters);
        setLogs(logsData.logs);
        setTotalPages(logsData.totalPages);
        setTotalLogs(logsData.total);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch logs:", err);
        setError("Unable to fetch logs.");
      } finally {
        setIsLoadingLogs(false);
      }
    },
    [page, filters]
  );

  useEffect(() => {
    retrieveLogs();
  }, [retrieveLogs]);

  function handleNextPage() {
    if (page < totalPages) setPage(page + 1);
  }

  function handlePrevPage() {
    if (page > 1) setPage(page - 1);
  }

  function currentPageMessage() {
    return `Page ${page} of ${totalPages}`;
  }

  function totalPagesMessage() {
    return totalLogs === 0
      ? "No logs found."
      : `Showing ${logs.length} of ${totalLogs} logs.`;
  }

  function totalLogsMessage() {
    return totalLogs === 0
      ? "No logs found."
      : `Showing ${logs.length} of ${totalLogs} logs.`;
  }

  const contextValues = {
    logs,
    isLoadingLogs,
    error,
    retrieveLogs,
    handleNextPage,
    handlePrevPage,
    page,
    totalPages,
    setFilters,
    currentPageMessage,
    totalPagesMessage,
    totalLogsMessage,
    totalLogs,
  };

  return (
    <LogsContext.Provider value={contextValues}>
      {children}
    </LogsContext.Provider>
  );
}

export default LogsContextWrapper;
