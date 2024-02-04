
import { OptionType } from "../Type/Type"

const defaultOptions: OptionType = {
  color: {
    color: '#000',
    backgroundColor: '#fff',
    borderColor: '#ddd'
  },
  download: true,
  filter: true,
  print: true,
  search: true,
  viewColumns: true,
  pagination: true,
  resizableColumns: true,
  responsive: true,
  rowsPerPage: 10,
  rowsPerPageOptions: [5, 10, 20, 50, 100],
  searchPlaceholder: '',
  selectableRowsHideCheckboxes: false,
  cells: {
    imageWidth: 60,
  },
  textLabels: {
    body: {
      title: '',
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


export default defaultOptions