
type FieldColumnType = {
  title: string,
  eventHandler?: (value: any) => void,
}

type ColumnType = {
  field: FieldColumnType[],
  label: string,
  kind: 'text' | 'textBox' | 'button' | 'image' | 'boolean',
  eventHandler?: (value: any) => void,
}

type DataTableType = {
  direction?: 'rtl' | 'ltr' | 'inherit',
  columns: ColumnType[],
  rows:any,
}


export type { DataTableType, ColumnType }