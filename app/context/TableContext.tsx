import React, { createContext, useState, useCallback, useMemo } from "react";

interface TableContextProps {
  sortColumn: string | null;
  sortOrder: "asc" | "desc" | null;
  filters: { [key: string]: string };
  globalSearch: string;
  setSortColumn: (column: string) => void;
  setFilter: (column: string, value: string) => void;
  setGlobalSearch: (value: string) => void;
}

export const TableContext = createContext<TableContextProps | undefined>(
  undefined
);

export const TableProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [globalSearch, setGlobalSearch] = useState<string>("");

  const handleSortColumn = useCallback((column: string) => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setSortColumn(column);
  }, []);

  const setFilter = useCallback((column: string, value: string) => {
    setFilters((prev) => ({ ...prev, [column]: value }));
  }, []);

  const contextValue = useMemo(
    () => ({
      sortColumn,
      sortOrder,
      filters,
      globalSearch,
      setSortColumn: handleSortColumn,
      setFilter,
      setGlobalSearch,
    }),
    [sortColumn, sortOrder, filters, globalSearch]
  );

  return (
    <TableContext.Provider value={contextValue}>
      {children}
    </TableContext.Provider>
  );
};
