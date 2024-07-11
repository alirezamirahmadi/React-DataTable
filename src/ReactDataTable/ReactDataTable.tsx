import { createContext, useState, useRef, useEffect } from "react";

import { ContextType, ReactDataTableType, filterType, ColumnType, ColumnOptionType, OptionType } from "../Type/Type";
import Table from "../Components/Table/Table";
import Menu from "../Components/Menu/Menu";
import defaultOptions from "../Default/defaultOptions";
import { extractField } from "../utils/functions";
import '../Style/main.css';

const MainContext = createContext<ContextType>(
  {
    rowData: null,
    columnData: [],
    showMenuSubItems: { filter: false, search: false, displayColumns: false },
    countSelectedRows: 0,
    listFilter: [],
    sortedField: { title: '', kind: false },
    searchValue: '',
    options: undefined,
    setRowData: () => null,
    setColumnData: () => null,
    setShowMenuSubItems: () => null,
    setCountSelectedRows: () => null,
    setListFilter: () => null,
    setSearchValue: () => null,
    handleFilter: () => null,
    sortData: () => null,
    handleSearch: () => null,
    handlePrint: () => null,
    displayColumn: () => null,
  }
);

export default function DataTable({ direction = 'ltr', columns, rows, options }: ReactDataTableType) {
  const [rowData, setRowData] = useState(rows);
  const [columnData, setColumnData] = useState<ColumnType[]>(columns);
  const [showMenuSubItems, setShowMenuSubItems] = useState({ filter: false, search: false, displayColumns: false });
  const [countSelectedRows, setCountSelectedRows] = useState<number>(0);
  const [listFilter, setListFilter] = useState<filterType[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const sortedField = useRef({ title: '', kind: false });

  const handleFilter = () => {
    sortData(search(filter()), '');
  }

  const handleSearch = () => {
    sortData(search(filter()), '');
  }

  const filter = () => {
    let tempRows = [...rows];
    listFilter.map(filter => {
      switch (filter.condition.value) {
        case 'Equal':
          tempRows = [...tempRows].filter(row => extractField(row, filter.column.value).toString() === filter.text);
          break;
        case 'NotEqual':
          tempRows = [...tempRows].filter(row => extractField(row, filter.column.value).toString() != filter.text);
          break;
        case 'Include':
          tempRows = [...tempRows].filter(row => extractField(row, filter.column.value).toString().includes(filter.text));
          break;
        case 'DontInclude':
          tempRows = [...tempRows].filter(row => !extractField(row, filter.column.value).toString().includes(filter.text));
          break;

        default:
          break;
      }
    })
    return tempRows;
  }

  const search = (row: any[]) => {
    if (searchValue === '') {
      return row;
    }
    else {
      let tempRow: any[] = [];
      let includeValue: boolean = false;
      row.map((data: any) => {
        includeValue = false;
        columns.map(column => {
          if (column.options?.search != false && column.options?.display != false && (extractField(data, column.field.title) + '').toString().toLowerCase().includes(searchValue.toLowerCase())) includeValue = true;
        })
        includeValue && tempRow.push(data);
      })
      return tempRow;
    }
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

  const sortData = (row: any[], fieldTitle: string) => {
    if (sortedField.current.title === '' && fieldTitle === '') {
      setRowData(row);
    }
    else {
      let field: string = fieldTitle ? fieldTitle : sortedField.current.title;
      let tempData = [...row];
      if (fieldTitle) {
        sortedField.current.title = fieldTitle;
        sortedField.current.kind = !sortedField.current.kind;
      }
      tempData.sort((a: any, b: any) => {
        const nameA = typeof a[field] === 'string' ? a[field].toUpperCase() : a[field];
        const nameB = typeof b[field] === 'string' ? b[field].toUpperCase() : b[field];
        return nameA < nameB ? (sortedField.current.kind ? -1 : 1) : (sortedField.current.kind ? 1 : -1);
      });
      setRowData(tempData);
    }
  }

  const handlePrint = () => {}

    useEffect(() => {
      handleSearch();
    }, [searchValue])

    useEffect(()=>{
      setSearchValue('');
    }, [showMenuSubItems.search])

  return (
    <>
      <MainContext.Provider value={{
        rowData,
        columnData,
        showMenuSubItems,
        countSelectedRows,
        listFilter,
        sortedField: sortedField.current,
        searchValue,
        options: { ...defaultOptions, ...options },
        setRowData,
        setColumnData,
        setShowMenuSubItems,
        setCountSelectedRows,
        setListFilter,
        setSearchValue,
        handleFilter,
        sortData,
        handleSearch,
        handlePrint,
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
export type { ReactDataTableType, ColumnType, ColumnOptionType, OptionType }