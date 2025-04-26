import React, { useContext, useState, useEffect, memo } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { profilesData } from "../data/data";
import { useTable } from "../hooks/useTable";
import { useTableContext } from "../hooks/useTableContext";
import { TableContext } from "../context/TableContext";

interface DataTableProps {
  columns: string[];
  data: any[];
}

const DynamicTable: React.FC<DataTableProps> = ({ columns, data }) => {
  const [tableData, setTableData] = useState(data);
  const { data: filteredData } = useTable(tableData, columns);
  const { setSortColumn, setFilter, setGlobalSearch } = useTableContext();
  const [editing, setEditing] = useState<{
    rowId: number | null;
    column: string | null;
  }>({ rowId: null, column: null });
  const [searchInput, setSearchInput] = useState(""); // local input before debounce
  const { isDarkMode, toggleChangeTheme } = useContext(ThemeContext);

  // Debounce logic
  useEffect(() => {
    const timeout = setTimeout(() => {
      setGlobalSearch(searchInput);
    }, 300); // 300ms delay

    return () => clearTimeout(timeout);
  }, [searchInput, setGlobalSearch]);

  const handleEdit = (rowId: number, column: string, value: string) => {
    setTableData((prevData) =>
      prevData.map((row, index) =>
        index === rowId ? { ...row, [column]: value } : row
      )
    );
    setEditing({ rowId: null, column: null });
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-black/50 text-white" : "bg-white text-black"
      } px-6 py-4 w-full`}
    >
      <div className="flex justify-between items-center mb-8 w-full">
        <div className="flex flex-col gap-y-2">
          <label>Search</label>
          <input
            type="text"
            placeholder="Search"
            className="p-2 text-gray-500 bg-white border-1 w-[400px]"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <button
          className={`${
            isDarkMode ? "border-white" : "border-black"
          } px-2 py-1 cursor-pointer w-[100px] border rounded-md`}
          onClick={toggleChangeTheme}
        >
          {isDarkMode ? "Light" : "Dark"}
        </button>
      </div>
      <div className="w-full border-1 border-gray-500 rounded-md px-4 py-6 relative overflow-auto">
        <div className="bg-amber-300 w-[30%] mb-3 px-4 py-3 rounded-lg text-black/50">
          <h3 className="font-semibold text-lg">Table Guide</h3>
          <ul className="list-inside list-disc font-normal text-sm">
            <li>Sort: Click table head for sort the data</li>
            <li>You can edit any data by double-click on the table cell</li>
          </ul>
        </div>
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="border p-2 cursor-pointer"
                  onClick={() => setSortColumn(col)}
                >
                  {col.toUpperCase()}
                </th>
              ))}
            </tr>
            <tr>
              {columns.map((col) => (
                <th key={col} className="border p-2">
                  <input
                    type="text"
                    className="border p-1 w-full"
                    placeholder={`Filter ${col}`}
                    onChange={(e) => setFilter(col, e.target.value)}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {filteredData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col) => (
                  <td
                    key={col}
                    className="border p-2"
                    onDoubleClick={() =>
                      setEditing({ rowId: rowIndex, column: col })
                    }
                  >
                    {editing.rowId === rowIndex && editing.column === col ? (
                      <input
                        type="text"
                        className="border p-1 w-full"
                        defaultValue={row[col]}
                        onBlur={(e) =>
                          handleEdit(rowIndex, col, e.target.value)
                        }
                        onKeyDown={(e) =>
                          e.key === "Enter" &&
                          handleEdit(rowIndex, col, e.currentTarget.value)
                        }
                        autoFocus
                      />
                    ) : (
                      row[col]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default memo(DynamicTable);
