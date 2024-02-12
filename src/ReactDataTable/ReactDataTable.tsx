import { createContext, useState } from "react";

import { ContextType, ReactDataTableType, filterType, ColumnType, ColumnOptionType, OptionType } from "../Type/Type";
import Table from "../Components/Table/Table";
import Menu from "../Components/Menu/Menu";
import defaultOptions from "../Options/defaultOptions";
import '../Style/main.css'

const MainContext = createContext<ContextType>(
  {
    rowData: null,
    columnData: [],
    showMenuSubItems: { filter: false, search: false, displayColumns: false },
    countSelectedRows: 0,
    options: undefined,
    setRowData: () => null,
    setColumnData: () => null,
    setShowMenuSubItems: () => null,
    setCountSelectedRows: () => null,
    handleFilter: () => null,
    handleSearch: () => null,
    displayColumn: () => null,
  }
);

export default function DataTable({ direction = 'ltr', columns, rows, options }: ReactDataTableType) {
  const [rowData, setRowData] = useState(rows);
  const [columnData, setColumnData] = useState<ColumnType[]>(columns);
  const [showMenuSubItems, setShowMenuSubItems] = useState({ filter: false, search: false, displayColumns: false });
  const [countSelectedRows, setCountSelectedRows] = useState<number>(0);

  const handleFilter = (listFilter: filterType[]) => {
    let tempRows = [...rows];
    listFilter.map(filter => {
      switch (filter.condition.value) {
        case 'Equal':
          tempRows = [...tempRows].filter(row => row[filter.column.value].toString() === filter.text);
          break;
        case 'NotEqual':
          tempRows = [...tempRows].filter(row => row[filter.column.value].toString() != filter.text);
          break;
        case 'Include':
          tempRows = [...tempRows].filter(row => row[filter.column.value].toString().includes(filter.text));
          break;
        case 'DontInclude':
          tempRows = [...tempRows].filter(row => !row[filter.column.value].toString().includes(filter.text));
          break;

        default:
          break;
      }
    })
    return setRowData(tempRows);
  }

  const handleSearch = (value: string) => {
    if (value === '') {
      setRowData(rows);
      return;
    }

    let tempRow: any[] = [];
    let includeValue: boolean = false;
    rowData.map((data: any) => {
      includeValue = false;
      columns.map(column => {
        if (column.options?.search != false && column.options?.display != false && (data[column.field.title] + '').toString().toLowerCase().includes(value.toLowerCase())) includeValue = true;
      })
      includeValue && tempRow.push(data);
    })
    setRowData(tempRow);
  }

  const displayColumn = (checked: boolean, label: string) => {
    let tempColumn = [...columnData];
    tempColumn.map(column => {
      if (column.label === label) {
        if (column.options) {
          column.options.display = checked;
        }
        else {
          column.options = { display: checked }
        }
      }
    })
    setColumnData(tempColumn);
  }

  return (
    <>
      <MainContext.Provider value={{
        rowData,
        columnData,
        showMenuSubItems,
        countSelectedRows,
        options: { ...defaultOptions, ...options },
        setRowData,
        setColumnData,
        setShowMenuSubItems,
        setCountSelectedRows,
        handleFilter,
        handleSearch,
        displayColumn,
      }}>
        <div id='div-datatable' dir={direction} >
          <Menu />
          <Table />
        </div>
      </MainContext.Provider>
    </>
  )
}

export { MainContext };
export type {ReactDataTableType, ColumnType, ColumnOptionType, OptionType}