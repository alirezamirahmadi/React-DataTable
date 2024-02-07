import React from 'react';
import DataTable from '../../src/ReactDataTable/ReactDataTable';
import { ProductsData } from '../ExampleData/ExampleData';
import { ColumnType, OptionType } from '../../src/Type/Type';

const columns: ColumnType[] = [
  { field: { title: 'title' }, label: 'Title' },
  { field: { title: 'price' }, label: 'Price' },
  { field: { title: 'category' }, label: 'Category' },
  { field: { title: 'image' }, label: 'Image', kind:'image' },
  { field: { title: 'description' }, label: 'Description' },
]

export default function Example(): React.JSX.Element {
  const options: OptionType = {
    color: {
      color: '#e3f2fd',
      backgroundColor: '#0288d1',
      borderColor: '#90caf9'
    },
    download: false,
    filter: true,
    print: true,
    search: false,
    viewColumns: true,
    pagination: true,
    resizableColumns: false,
    responsive: true,
    rowsPerPage: 6,
    rowsPerPageOptions: [6, 10, 20, 50],
    searchPlaceholder: '',
    selectableRowsHideCheckboxes: true,
    cells: {
      imageWidth: 150,
    },
    textLabels: {
      body: {
        title: 'Options',
        noMatch: "Sorry, no data found",
        toolTip: "Sort",
      },
      pagination: {
        first: "First Page",
        last: "Last Page",
        next: "Next Page",
        previous: "Previous Page",
        rowsPerPage: "Rows per page:",
      },
      menu: {
        search: "Search",
        downloadExcel: "Download Excel",
        print: "Print",
        viewColumns: "View Columns",
        filterTable: "Filter Table",
      },
      filter: {
        title: "Filter Table",
        add: 'Add Filter',
        delete: 'Delete Filter',
      },
      viewColumns: {
        title: "Show Columns",
        titleItem: "Show/Hide Column",
      },
      selectedRows: {
        text: "row(s) selected",
        delete: "Delete Selected Rows",
      },
    }
  }
  return (
    <DataTable direction='ltr' rows={ProductsData} columns={columns} options={options}/>
  )
}