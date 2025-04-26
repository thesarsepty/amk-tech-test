import { useContext } from "react";
import { TableContext } from "../context/TableContext";

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used inside a TableProvider");
  }
  return context;
};
