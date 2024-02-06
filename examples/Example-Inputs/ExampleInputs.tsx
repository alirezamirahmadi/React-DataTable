import React from 'react';
import DataTable from '../../src/DataTable/DataTable';
import { ProductsData } from '../ExampleData/ExampleData';
import { ColumnType } from '../../src/Type/Type';

const columns: ColumnType[] = [
  { field: { title: 'title' }, label: 'Title', kind: 'textarea' },
  { field: { title: 'stock' }, label: 'Stock', kind: 'input/number' },
  { field: { title: 'category' }, label: 'Category', kind: 'input/textbox' },
  { field: { title: 'date' }, label: 'Add Date', kind: 'input/date' },
  { field: { title: 'active' }, label: 'Active', kind: 'boolean' },
]

export default function Example(): React.JSX.Element {
  return (
    <DataTable direction='ltr' rows={ProductsData} columns={columns} />
  )
}