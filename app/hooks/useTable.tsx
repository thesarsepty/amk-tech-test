import { useContext, useMemo } from "react";
import { TableContext } from "../context/TableContext";

export const useTable = (data: any[], columns: string[]) => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTable must be used within a TableProvider");
  }

  const { sortColumn, sortOrder, filters, globalSearch } = context;

  // Sorting Logic
  const sortedData = useMemo(() => {
    if (!sortColumn) return data;
    return [...data].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortColumn, sortOrder]);

  // Filtering Logic
  const filteredData = useMemo(() => {
    return sortedData.filter((row) => {
      const passesColumnFilters = columns.every((col) =>
        row[col]
          .toString()
          .toLowerCase()
          .includes(filters[col]?.toLowerCase() || "")
      );
      const passesGlobalSearch = Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(globalSearch.toLowerCase());

      return passesColumnFilters && passesGlobalSearch;
    });
  }, [sortedData, filters, columns, globalSearch]);

  return { data: filteredData };
};
