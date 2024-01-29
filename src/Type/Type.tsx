
type FieldColumnType = {
  title: string,
  eventHandlerRow?: (value: any) => void,
}

type ColumnOptionType = {
  sort?: boolean,
  filter?: boolean,
  display?: boolean,
}

type ColumnType = {
  field: FieldColumnType[],
  label: string,
  kind: 'text' | 'input/textbox' | 'input/date' | 'input/datetime-local' | 'input/number' | 'input/file' | 'input/password' | 'textarea' | 'button' | 'image' | 'boolean' | 'select' | 'progress',
  option?: ColumnOptionType,
  eventHandlerHeader?: (value: any) => void,
}

type ContextType = {
  rowData: any,
  columnData: ColumnType[],
  showMenuSubItems: { filter: boolean, search: boolean, displayColumns: boolean },
  countSelectedRows: number,
  options?: OptionType,
  setRowData: (rowData: any) => void,
  setColumnData: (columnData: any) => void,
  setShowMenuSubItems: (columnData: any) => void,
  setCountSelectedRows: (count: number) => void,
  handleFilter: (listFilter: filterType[]) => void;
  handleSearch: (value: string) => void;
  displayColumn: (checked: boolean, label: string) => void;
  onDeleteRow?: (rows: any[]) => void;
}

type ReactDataTableType = {
  direction?: 'rtl' | 'ltr' | 'inherit',
  columns: ColumnType[],
  allRows: any,
  options?: OptionType,
  onDeleteRow?: (rows: any[]) => void;
}

type DataTableType = {
  // direction?: 'rtl' | 'ltr' | 'inherit',
  // columns: ColumnType[],
  // allRows: any,
  // options?: OptionType,
}

type OptionType = {
  color?: {
    color?: string,
    backgroundColor?: string,
    borderColor?: string,
  },
  textLabels?: {
    body?: {
      noMatch?: string,
      toolTip?: string,
    },
    pagination?: {
      first?: string,
      last?: string,
      next?: string,
      previous?: string,
      rowsPerPage?: string,
      displayRows?: string,
    },
    menu?: {
      search?: string,
      downloadExcel?: string,
      print?: string,
      viewColumns?: string,
      filterTable?: string,
    },
    filter?: {
      title?: string,
      add?: string,
      delete?: string,
    },
    viewColumns?: {
      title?: string,
      titleItem?: string,
    },
    selectedRows?: {
      text?: string,
      delete?: string,
    },
  }
}

type MenuType = {
  // countSelectedRows: number,
  // columns: ColumnType[] | undefined,
  // options?: OptionType,
  // displayColumn: (checked: boolean, lable: string) => void,
  // handleSearch: (value: string) => void,
  // handleDelete: () => void,
  // handleFilter?: (filters: filterType[]) => void,
}

type filterType = {
  column: { value: string, label: string },
  condition: { value: string, label: string },
  text: string,
}

type PaginationType = {
  pageCount: number,
  currentPage: number,
  pageNoHandler: (pageNo: number, rowPerPAge: number) => void,
  justifyContent?: string,
  next?: boolean,
  previous?: boolean,
  first?: boolean,
  last?: boolean,
}

type ButtonType = {
  text: string | React.JSX.Element,
  startIcon?: any,
  size: 'small' | 'medium' | 'large',
  clickHandler: () => void,
  disabled?: boolean,
  className: string,
  classStyle?: 'button-main' | 'button-second' | 'button-text',
}


export type {
  DataTableType, ColumnType, MenuType, filterType, PaginationType, ButtonType, OptionType,
  ContextType, ReactDataTableType
}