"use client";

import React, { useContext } from "react";
import ThemeContextProvider from "./context/ThemeContext";
import DynamicTable from "./components/DynamicTable";
import { profilesData } from "./data/data";
import { TableProvider } from "./context/TableContext";

export default function Home() {
  return (
    <ThemeContextProvider>
      <TableProvider>
        <div className="mx-auto h-[100vh] w-full">
          <DynamicTable
            columns={["name", "age", "email", "job", "location"]}
            data={profilesData}
          />
        </div>
      </TableProvider>
    </ThemeContextProvider>
  );
}
