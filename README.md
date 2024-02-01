# <p align="center">React DataTable</p>

<p align="center">
<img height="30" alt="typescript" src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/typescript-colored.svg">
<img height="30" alt="react" src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg">
</p>

<br/><br/>

### It's a datatable component on React. It comes with features like filtering, search, view/hide columns, export to excel file, printing, sorting, selectable rows, pagination, and responsible for mobile/tablet device. On top of the ability to put textbox, checkbox, button, and img in cells.

<br/><br/>

# Features:

- filtering
- search
- view/hide columns
- export to excel file
- printing
- sorting
- selectable rows
- pagination
- responsible for mobile/tablet
- resizable columns
- put textbox, checkbox, button, img, and ... in cells

# Table of contents

- [Install](#install)
- [Demo](#demo)
- [Usage](#usage)
- [API](#api)
    - [&lt;ReactDataTable />](#Reactdatatable-)
    - [Options:](#options)
- [Customize Columns](#customize-columns)
    - [Column:](#column)
    - [Column Options:](#column-options)
- [Opttions](#options)
- [License](#license)

# Install

`npm install --save`

# Demo

# Usage

simple table


custemized table

# API

The component accepts the following props:

|Name|Type|Description
|:--:|:-----|:-----|
|**`title`**|string|Title used to caption table
|**`columns`**|array|Columns used to describe table. Must be either an array of simple strings or objects describing a column
|**`data`**|array|Data used to describe table. Must be either an array containing objects of key/value pairs with values that are strings or numbers, or arrays of strings or numbers 
|**`options`**|object|Options used to describe table

# Customize Columns

On each column object, you have the ability to customize columns to your liking with the 'options' property. Example:

```js
const columns = [
 {
  name: "Name",
  options: {
   filter: true,
   sort: false
  }
 },
 ...
];
```

#### Column:
|Name|Type|Description
|:--:|:-----|:-----|
|**`name`**|string|Name of column (This field is required)
|**`label`**|string|Column Header Name override
|**`options`**|object|Options for customizing column

# Options

### Change default colors and texts

``` javascript
const defaultOptions {
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
```

# License
### The files included in this repository are licensed under the MIT license.