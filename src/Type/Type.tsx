
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
}

type filterType = {
  column:{value:string, label:string},
  condition:{value:string, label:string},
  text:string,
}

type PaginationType = {
  pageCount: number,
  currentPage: number,
  pageNoHandler: (pageNo: number, rowPerPAge:number) => void,
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


export type { DataTableType, ColumnType, filterType, PaginationType, ButtonType }