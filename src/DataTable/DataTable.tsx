import { useState, useRef } from 'react';

import arrowDown from '../../public/svg/arrow-down.svg'
import arrowUp from '../../public/svg/arrow-up.svg'
import Menu from '../Menu/Menu';
import Cell from '../Cell/Cell'
import { DataTableType, ColumnType, filterType } from '../Type/Type'
import './DataTable.css'

export default function DataTable({ direction = 'rtl', columns, rows, onDeleteRow }: DataTableType) {
  const [rowData, setRowData] = useState(rows);
  const [columnData, setColumnData] = useState<ColumnType[]>(columns);
  const [countSelectedRows, setCountSelectedRows] = useState<number>(0);
  const sortedField = useRef({ title: '', kind: true });

  const sortData = (fieldTitle: string) => {
    let tempData = [...rows];
    tempData.sort((a: any, b: any) => {
      const nameA = typeof a[fieldTitle] === 'string' ? a[fieldTitle].toUpperCase() : a[fieldTitle];
      const nameB = typeof b[fieldTitle] === 'string' ? b[fieldTitle].toUpperCase() : b[fieldTitle];
      return nameA < nameB ? sortedField.current.kind ? -1 : 1 : sortedField.current.kind ? 1 : -1;
      // if (nameA < nameB) {
      //   return sortedField.current.kind ? -1 : 1;
      // }
      // if (nameA > nameB) {
      //   return sortedField.current.kind ? 1 : -1;
      // }
      // return 0;
    });
    sortedField.current.title = fieldTitle;
    sortedField.current.kind = !sortedField.current.kind;
    setRowData(tempData);
  }

  const displayColumn = (checked: boolean, label: string) => {
    let tempColumn = [...columnData];
    tempColumn.map(column => {
      if (column.label === label) {
        if (column.option) {
          column.option.display = checked;
        }
        else {
          column.option = { display: checked }
        }
      }
    })
    setColumnData(tempColumn);
  }

  const handleSearch = (value: string) => {
    if (value === '') {
      setRowData(rows);
      return;
    }

    let tempRow: any[] = [];
    let includeValue: boolean = false;
    rowData.map((data: any) => {
      includeValue = false;
      columnData.map(column => {
        if ((data[column.field[0].title] + '').toString().includes(value) && column.option?.display != false) includeValue = true;
      })
      includeValue && tempRow.push(data);
    })
    setRowData(tempRow);
  }

  const selectAllRows = (checked: boolean) => {
    let selectRow = (document.querySelectorAll('.td-select-row') as NodeListOf<HTMLInputElement>);
    selectRow.forEach(element => {
      element.checked = checked;
    })
    setCountSelectedRows(checked ? selectRow.length : 0);
  }

  const selectRow = (checked: boolean, rowData: any) => {
    setCountSelectedRows(preValue => checked ? preValue + 1 : preValue - 1);
  }

  const handleDelete = () => {
    let tempRows = [...rowData];
    let selectedRows: any[] = [];
    let selectRow = (document.querySelectorAll('.td-select-row') as NodeListOf<HTMLInputElement>);
    selectRow.forEach((element, index) => {
      element.checked && selectedRows.push(tempRows.splice(index - selectedRows.length, 1));
    })
    onDeleteRow && onDeleteRow(selectedRows);
    setRowData(tempRows);
    console.log(selectedRows);
    
  }

  const handleFilter = (listFilter:filterType[]) => {
    let tempRows = [...rows];
    listFilter.map(filter => {
      switch (filter.condition.value) {
        case 'Equal':
          tempRows = [...tempRows].filter(row => row[filter.column.value].toString() === filter.text);          
          break;
        case 'NotEqual':
          tempRows = [...tempRows].filter(row => row[filter.column.value].toString() != filter.text);          
          break;
        case 'Include':
          tempRows = [...tempRows].filter(row => row[filter.column.value].toString().includes(filter.text));          
          break;
          case 'DontInclude':
          tempRows = [...tempRows].filter(row => !row[filter.column.value].toString().includes(filter.text));                    
          break;
      
        default:
          break;
      }
    })
    setRowData(tempRows);
  }

  return (
    <div id='div-table' dir={direction}>
      {
        rows.length === 0 &&
        <div className="alert-nodata">No data found</div>
      }
      <Menu countSelectedRows={countSelectedRows} columns={columnData} displayColumn={displayColumn} handleSearch={handleSearch} handleDelete={handleDelete} handleFilter={handleFilter} />
      <table id='data-table'>
        <thead>
          <tr>
            <th>
              <input type="checkbox" onChange={event => selectAllRows(event.target.checked)} />
            </th>
            {
              columnData.map(header => (
                <th key={header.field[0].title} style={{ display: header.option?.display === false ? 'none' : 'table-cell' }} onClick={() => header.option?.sort && sortData(header.field[0].title)}>
                  {header.label}
                  {sortedField.current.title === header.field[0].title && !sortedField.current.kind && <img src={arrowDown} width={15} />}
                  {sortedField.current.title === header.field[0].title && sortedField.current.kind && <img src={arrowUp} width={15} />}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            rowData.map((data: any) => (
              <tr key={data.id}>
                <td>
                  <input type="checkbox" className='td-select-row' onChange={(event) => selectRow(event.target.checked, data)} />
                </td>
                {
                  columnData.map((header) => (
                    <td key={header.field[0].title} style={{ display: header.option?.display === false ? 'none' : 'table-cell' }}>
                      <Cell column={header} row={data} />
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}


