import React from 'react';
import DataTable from '../../src/DataTable/DataTable';
import { ProductsData } from '../ExampleData/ExampleData';
import { ColumnType } from '../../src/Type/Type';

const columns: ColumnType[] = [
  { field: { title: 'title' }, label: 'Title' },
  { field: { title: 'price' }, label: 'Price' },
  { field: { title: 'category' }, label: 'Category' },
  { field: { title: 'description' }, label: 'Description' },
]

export default function Example(): React.JSX.Element {
  return (
    <DataTable rows={ProductsData} columns={columns} />
  )
}