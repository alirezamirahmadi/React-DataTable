
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
  kind: 'text' | 'textBox' | 'button' | 'image' | 'boolean',
  option?: ColumnOptionType,
  eventHandlerHeader?: (value: any) => void,
}

type DataTableType = {
  direction?: 'rtl' | 'ltr' | 'inherit',
  columns: ColumnType[],
  rows: any,
  onDeleteRow?: (rows: any[]) => void;
  options?: OptionType,
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
      first?:string,
      last?:string,
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
  countSelectedRows: number,
  columns: ColumnType[],
  options?:OptionType,
  displayColumn: (checked: boolean, lable: string) => void,
  handleSearch: (value: string) => void,
  handleDelete: () => void,
  handleFilter: (filters: filterType[]) => void,
}

type filterType = {
  column: { value: string, label: string },
  condition: { value: string, label: string },
  text: string,
}

type PaginationType = {
  pageCount: number,
  currentPage: number,
  options?:OptionType,
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


export type { DataTableType, ColumnType, MenuType, filterType, PaginationType, ButtonType, OptionType }