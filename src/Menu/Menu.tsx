import { useState, useRef, useEffect } from 'react';

// import displayColumnSVG from '../../public/svg/display-column.svg';
// import downloadExcelSVG from '../../public/svg/download-excel.svg';
// import printSVG from '../../public/svg/print.svg';
// import searchSVG from '../../public/svg/search.svg';
// import filterSVG from '../../public/svg/filter.svg';
// import deleteSVG from '../../public/svg/delete.svg';
import closeSVG from '../../public/svg/close.svg';
import addSVG from '../../public/svg/add.svg';
import { ColumnType, filterType, MenuType } from "../Type/Type"
import IconButton from '../IconButton/IconButton';
import './Menu.css'

export default function Menu({ countSelectedRows, columns, options, displayColumn, handleSearch, handleDelete, handleFilter }
  : MenuType): React.JSX.Element {

  const [showDisplayColumn, setShowDisplayColumn] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filterColumn, setFilterColumn] = useState('');
  const [filterCondition, setFilterCondition] = useState('');
  const [filterText, setFilterText] = useState('');
  const [listFilter, setListFilter] = useState<filterType[]>([]);
  const txtSearch = useRef<HTMLInputElement>(null);
  const slFilterColumn = useRef<HTMLSelectElement>(null);
  const slFilterCondition = useRef<HTMLSelectElement>(null);

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

  const addFilter = () => {
    if (filterColumn === '-1' || filterCondition === '-1' || filterText === '' ||
      listFilter.some(filter => filter.column.value === filterColumn)) {
      return;
    }
    let tempFilter = [...listFilter];
    tempFilter.push({ column: { value: filterColumn, label: slFilterColumn.current ? getTextOfSelect(slFilterColumn.current, filterColumn) : '' }, condition: { value: filterCondition, label: slFilterCondition.current ? getTextOfSelect(slFilterCondition.current, filterCondition) : '' }, text: filterText, });
    setListFilter(tempFilter);
  }

  const getTextOfSelect = (select: HTMLSelectElement, value: string): string => {
    for (let i = 0; i < select.length; i++) {
      let option = select.options[i];
      if (option.value == value) {
        return option.text;
      }
    }
    return '';
  }

  const removeFilter = (column: string) => {
    let tempFilter = listFilter.filter(filter => filter.column.value != column);
    setListFilter(tempFilter);
  }

  useEffect(() => {
    txtSearch.current?.focus();
  }, [showSearch])

  useEffect(() => {
    handleFilter(listFilter);
  }, [listFilter])

  return (
    <>
      {
        countSelectedRows === 0
          ?
          <div className='main-block' style={{ color: options?.color?.color, backgroundColor: options?.color?.backgroundColor, borderColor: options?.color?.borderColor }}>
            <IconButton width={25} onClick={() => setShowDisplayColumn(preValue => !preValue)} title={options?.textLabels?.menu?.viewColumns}
              svg={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
              } />
            <IconButton width={25} onClick={() => setShowFilter(preValue => !preValue)} title={options?.textLabels?.menu?.filterTable}
              svg={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                </svg>
              } />
            <IconButton width={25} onClick={convertToExcel} title={options?.textLabels?.menu?.downloadExcel}
              svg={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                </svg>
              } />
            <IconButton width={25} onClick={printTable} title={options?.textLabels?.menu?.print}
              svg={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                </svg>
              } />
            <IconButton width={25} onClick={() => setShowSearch(preValue => !preValue)} title={options?.textLabels?.menu?.search}
              svg={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              } />
            {showSearch &&
              <div className='search' style={{ color: options?.color?.color, backgroundColor: options?.color?.backgroundColor, borderColor: options?.color?.borderColor }}>
                <input type='text' ref={txtSearch} className='search__input' value={searchValue} onChange={(event) => searchTable(event.target.value)} />
                <button className='search__close' >
                  <img src={closeSVG} width={18} onClick={() => searchTable('')} />
                </button>
              </div>
            }
            {showDisplayColumn &&
              <ul className='show-column' >
                <li>{options?.textLabels?.viewColumns?.title}</li>
                <hr />
                {
                  columns.map(header => (
                    <li key={header.label} title={options?.textLabels?.viewColumns?.titleItem}>
                      <input id="display-column" type="checkbox" checked={header.option?.display === false ? false : true} onChange={(event) => displayColumn(event.target.checked, header.label)} />
                      <label htmlFor="display-column">{header.label}</label>
                    </li>
                  ))
                }
              </ul>
            }
            {showFilter &&
              <div className="filter" >
                <span>{options?.textLabels?.filter?.title}</span>
                <div className="filter-item" style={{ color: options?.color?.color, backgroundColor: options?.color?.backgroundColor, borderColor: options?.color?.borderColor }}>
                  <select ref={slFilterColumn} className='filter-item__column' value={filterColumn} onChange={event => setFilterColumn(event.target.value)} >
                    <option value='-1'>---</option>
                    {
                      columns.map(column => (
                        <option key={column.label} value={column.field[0].title}>{column.label}</option>
                      ))
                    }
                  </select>
                  <select ref={slFilterCondition} className='filter-item__condition' value={filterCondition} onChange={event => setFilterCondition(event.target.value)} >
                    <option value='-1'>---</option>
                    <option value="Equal">Equal</option>
                    <option value="NotEqual">Not Equal</option>
                    <option value="Include">Include</option>
                    <option value="DontInclude">Don't Include</option>
                  </select>
                  <input className='filter-item__text' type="text" value={filterText} onChange={event => setFilterText(event.target.value)} />
                  <img className='filter-item__add' src={addSVG} width={20} title='Add' onClick={addFilter} />
                </div>
                <ul className='filter-list' style={{ color: options?.color?.color, backgroundColor: options?.color?.backgroundColor, borderColor: options?.color?.borderColor }}>
                  {
                    listFilter.map(filter => (
                      <li key={filter.column.value} className='filter-list__li'>
                        <span>{filter.column.label} - {filter.condition.label} - {filter.text}</span>
                        <img className='filter-list__remove' src={closeSVG} width={15} title='Add' onClick={() => removeFilter(filter.column.value)} />
                      </li>
                    ))
                  }
                </ul>
              </div>
            }
          </div>
          :
          <div className='select-block' style={{ color: options?.color?.color, backgroundColor: options?.color?.backgroundColor, borderColor: options?.color?.borderColor }}>
            <IconButton width={25} onClick={handleDelete} title={options?.textLabels?.selectedRows?.delete}
              svg={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              } />
            <p>{countSelectedRows} {options?.textLabels?.selectedRows?.text}</p>
          </div>
      }
    </>
  )
}