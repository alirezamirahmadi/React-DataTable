import { useState, useRef, useEffect } from 'react';

import displayColumnSVG from '../../public/svg/display-column.svg';
import downloadExcelSVG from '../../public/svg/download-excel.svg';
import printSVG from '../../public/svg/print.svg';
import searchSVG from '../../public/svg/search.svg';
import closeSVG from '../../public/svg/close.svg';
import deleteSVG from '../../public/svg/delete.svg';
import { ColumnType } from "../Type/Type"
import './Menu.css'

export default function Menu({ countSelectedRows, columns, displayColumn, handleSearch, handleDelete }:
  {
    countSelectedRows: number, 
    columns: ColumnType[],
    displayColumn: (checked: boolean, lable: string) => void,
    handleSearch: (value: string) => void,
    handleDelete: () => void;
  }): React.JSX.Element {

  const [showDisplayColumn, setShowDisplayColumn] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const txtSearch = useRef<HTMLInputElement>(null);

  const convertToExcel = () => {
    tableToExcel()('data-table', 'table');
  }

  const tableToExcel = () => {
    var uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
      , base64 = function (s: any) { return window.btoa(unescape(encodeURIComponent(s))) }
      , format = function (s: any, c: any) { return s.replace(/{(\w+)}/g, function (m: any, p: any) { return c[p]; }) }
    return function (table: any, name: string) {
      if (!table.nodeType) table = document.getElementById(table)
      var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
      window.location.href = uri + base64(format(template, ctx))
    }
  }

  const printTable = () => {
    let printWindow = window.open('', '');
    printWindow?.document.write('<html><head><title>Table Contents</title>');

    //Print the Table CSS.
    let table_style = document.getElementById("data-table")!.getAttribute('style');
    printWindow?.document.write('<style type = "text/css">');
    printWindow?.document.write(table_style ? table_style : '');
    printWindow?.document.write('</style>');
    printWindow?.document.write('</head>');

    printWindow?.document.write('<body>');
    let divContents = document.getElementById("div-table")!.innerHTML;
    printWindow?.document.write(divContents);
    printWindow?.document.write('</body>');

    printWindow?.document.write('</html>');
    printWindow?.document.close();
    printWindow?.print();
  }

  const searchTable = (value: string) => {
    setSearchValue(value);
    handleSearch(value);
    txtSearch.current?.focus();
  }

  useEffect(() => {
    txtSearch.current?.focus();
  }, [showSearch])

  return (
    <>
      {
        countSelectedRows === 0
          ?
          <div className='main-block'>
            <img className='main-block__img' src={displayColumnSVG} width={25} title='Show Columns' onClick={() => setShowDisplayColumn(preValue => !preValue)} />
            <img className='main-block__img' src={downloadExcelSVG} width={25} title='Download Excel' onClick={convertToExcel} />
            <img className='main-block__img' src={printSVG} width={25} title='Print Table' onClick={printTable} />
            <img className='main-block__img' src={searchSVG} width={25} title='Search' onClick={() => setShowSearch(preValue => !preValue)} />
            {showSearch &&
              <div className='search'>
                <input type='text' ref={txtSearch} className='search__input' value={searchValue} onChange={(event) => searchTable(event.target.value)} />
                <button className='search__close'>
                  <img src={closeSVG} width={18} onClick={() => searchTable('')} />
                </button>
              </div>
            }
            {showDisplayColumn &&
              <ul className='show-column'>
                <li>ShowColumns</li>
                <hr />
                {
                  columns.map(header => (
                    <li key={header.label}>
                      <input id="display-column" type="checkbox" checked={header.option?.display === false ? false : true} onChange={(event) => displayColumn(event.target.checked, header.label)} />
                      <label htmlFor="display-column">{header.label}</label>
                    </li>
                  ))
                }
              </ul>
            }
          </div>
          :
          <div>
            <img className='main-block__img' src={deleteSVG} width={25} title='Delete' onClick={handleDelete} />
          </div>
      }
    </>
  )
}