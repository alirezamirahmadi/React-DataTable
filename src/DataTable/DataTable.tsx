import { useState, useRef } from 'react';

import arrowDown from '../../public/svg/arrow-down.svg'
import arrowUp from '../../public/svg/arrow-up.svg'
import Menu from '../Menu/Menu';
import Cell from '../Cell/Cell'
import { DataTableType, ColumnType } from '../Type/Type'
import './DataTable.css'

export default function DataTable({ direction = 'rtl', columns, rows }: DataTableType) {
  const [rowData, setRowData] = useState(rows);
  const [columnData, setColumnData] = useState<ColumnType[]>(columns);
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

  return (
    <div dir={direction}>
      {
        rows.length === 0 &&
        <div className="alert-nodata">No data found</div>
      }
      <Menu columns={columnData} displayColumn={displayColumn} />
      <table id='data-table' className="">
        <thead>
          <tr>
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


