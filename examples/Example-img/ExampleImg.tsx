import React from 'react';
import DataTable from '../../src/ReactDataTable/ReactDataTable';
import { ProductsData } from '../ExampleData/ExampleData';
import { ColumnType } from '../../src/Type/Type';

const columns: ColumnType[] = [
  { field: { title: 'id' }, label: 'ID', },
  { field: { title: 'title' }, label: 'Title', },
  { field: { title: 'image' }, label: 'Image', kind: 'image' },
  { field: { title: 'price' }, label: 'Price', },
  { field: { title: 'category' }, label: 'Category', },
]

export default function Example(): React.JSX.Element {
  return (
    <DataTable rows={ProductsData} columns={columns} options={{cells:{imageWidth:45}}}/>
  )
}