import React from 'react';
import DataTable from '../../src/ReactDataTable/ReactDataTable';
import { ProductsData } from '../ExampleData/ExampleData';
import { ColumnType } from '../../src/Type/Type';

const columns: ColumnType[] = [
  { field: { title: 'id' }, label: 'ID', options: { display: false } },
  { field: { title: 'title' }, label: 'Title', options: { sort: true } },
  { field: { title: 'price' }, label: 'Price', options: { filter: false } },
  { field: { title: 'category' }, label: 'Category' },
  { field: { title: 'description' }, label: 'Description', options: { search: false } },
]

export default function Example(): React.JSX.Element {
  return (
    <DataTable direction='ltr' rows={ProductsData} columns={columns} />
  )
}