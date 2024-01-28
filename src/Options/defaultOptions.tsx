
import { OptionType } from "../Type/Type"

const defaultOptions: OptionType = {
  color: {
    color: '#000',
    backgroundColor: '#fff',
    borderColor: '#ddd'
  },
  textLabels: {
    body: {
      noMatch: "Sorry, no data found",
      toolTip: "Sort",
    },
    pagination: {
      first: "First Page",
      last: "Last Page",
      next: "Next Page",
      previous: "Previous Page",
      rowsPerPage: "Rows per page:",
      displayRows: "of",
    },
    menu: {
      search: "Search",
      downloadExcel: "Download Excel",
      print: "Print",
      viewColumns: "View Columns",
      filterTable: "Filter Table",
    },
    filter: {
      title:"Filter Table",
      add:'Add Filter',
      delete:'Delete Filter',
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