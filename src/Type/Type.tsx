import React from "react"

type FieldColumnType = {
  title: string,
  eventHandlerRow?: (value: any) => void,
}

type ColumnOptionType = {
  sort?: boolean,
  search?: boolean,
  filter?: boolean,
  display?: boolean,
  component?: (value?: any, updateValue?: (event: any) => void, rowData?: any) => React.JSX.Element,
}

type ColumnType = {
  field: FieldColumnType,
  label: string,
  kind?: 'input/textbox' | 'input/date' | 'input/datetime-local' | 'input/number' | 'input/password' | 'textarea' | 'button' | 'image' | 'boolean' | 'select' | 'progress' | 'component',
  options?: ColumnOptionType,
  eventHandlerHeader?: (value: any) => void,
}

type ContextType = {
  rowData: any,
  columnData: ColumnType[],
  showMenuSubItems: showMenuSubItemsType,
  countSelectedRows: number,
  listFilter: filterType[],
  sortedField: { title: string, kind: boolean },
  searchValue: string,
  options?: OptionType,
  setRowData: (rowData: any) => void,
  setColumnData: (columnData: any) => void,
  setShowMenuSubItems: (columnData: any) => void,
  setCountSelectedRows: (count: number) => void,
  setListFilter: (listFilter: filterType[]) => void;
  setSearchValue: (value: string) => void;
  handleFilter: () => void;
  sortData: (row: any, fieldTitle: string) => void,
  handleSearch: () => void;
  handlePrint: () => void;
  displayColumn: (checked: boolean, label: string) => void;
  onDeleteRow?: (rows: any[]) => void;
}

type ReactDataTableType = {
  direction?: 'rtl' | 'ltr' | 'inherit',
  columns: ColumnType[],
  rows: any[],
  options?: OptionType,
}


type OptionType = {
  color?: {
    color?: string,
    backgroundColor?: string,
    borderColor?: string,
  },
  download?: boolean,
  filter?: boolean,
  print?: boolean,
  search?: boolean,
  viewColumns?: boolean,
  pagination?: boolean,
  resizableColumns?: boolean,
  responsive?: boolean,
  rowsPerPage?: number,
  rowsPerPageOptions?: number[],
  searchPlaceholder?: string,
  selectableRowsHideCheckboxes?: boolean,
  cells?: {
    imageWidth?: number,
  },
  textLabels?: {
    body?: {
      title?: string,
      noMatch?: string,
      toolTip?: string,
    },
    pagination?: {
      first?: string,
      last?: string,
      next?: string,
      previous?: string,
      rowsPerPage?: string,
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
  onRowClick?: (rowData: any) => void,
  onRowsDelete?: (rowsData: any[]) => void,
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

type PrintFont = {
  family: string;
  source: string;
  weight?: string;
  style?: string;
}

type ITriggerProps<T> = {
  onClick: (event?: unknown) => void;
  ref: (v: T) => void;
}

type IReactToPrintProps = {
  bodyClass?: string;
  children?: React.ReactNode;
  content?: () => React.ReactInstance | null;
  copyStyles?: boolean;
  documentTitle?: string;
  fonts?: PrintFont[];
  nonce?: string;
  onAfterPrint?: () => void;
  onBeforeGetContent?: () => void | Promise<any>;
  onBeforePrint?: () => void | Promise<any>;
  onPrintError?: (errorLocation: "onBeforeGetContent" | "onBeforePrint" | "print", error: Error) => void;
  pageStyle?: string | (() => string);
  print?: (target: HTMLIFrameElement) => Promise<any>;
  removeAfterPrint?: boolean;
  suppressErrors?: boolean;
  trigger?: <T>() => React.ReactElement<ITriggerProps<T>>;
}

type showMenuSubItemsType = { filter: boolean, search: boolean, displayColumns: boolean }

type elemEventType = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>


export type {
  ColumnType, FieldColumnType, filterType, PaginationType, ButtonType, OptionType,
  ContextType, ReactDataTableType, elemEventType, ColumnOptionType, showMenuSubItemsType, 
  PrintFont, IReactToPrintProps
}