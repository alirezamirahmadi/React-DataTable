import { useState, useRef } from 'react';

import arrowDown from '../../public/svg/arrow-down.svg'
import arrowUp from '../../public/svg/arrow-up.svg'
import Cell from '../Cell/Cell'
import { DataTableType } from '../Type/Type'
import './DataTable.css'
export default function DataTable({ direction = 'rtl', columns, rows }: DataTableType) {
  const [rowData, setRowData] = useState(rows);
  const sortedField = useRef({ title: '', kind: true });

  const sortData = (fieldTitle: string) => {
    let tempData = [...rows];
    tempData.sort((a: any, b: any) => {
      const nameA = typeof a[fieldTitle] === 'string' ? a[fieldTitle].toUpperCase() : a[fieldTitle];
      const nameB = typeof b[fieldTitle] === 'string' ? b[fieldTitle].toUpperCase() : b[fieldTitle];
      if (nameA < nameB) {
        return sortedField.current.kind ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortedField.current.kind ? 1 : -1;
      }
      return 0;
    });
    sortedField.current.title = fieldTitle;
    sortedField.current.kind = !sortedField.current.kind;
    setRowData(tempData);
  }

  return (
    <div dir={direction}>
      {
        rows.length === 0 &&
        <div className="alert-nodata">No data found</div>
      }
      <table className="">
        <thead>
          <tr>
            {
              columns.map(header => (
                <>
                  <th key={header.field[0].title} onClick={() => sortData(header.field[0].title)}>
                    {header.label}
                    {sortedField.current.title === header.field[0].title && !sortedField.current.kind && <img src={arrowDown} width={15} />}
                    {sortedField.current.title === header.field[0].title && sortedField.current.kind && <img src={arrowUp} width={15} />}
                  </th>
                </>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            rowData.map((data: any) => (
              <tr key={data.id}>
                {
                  columns.map((header) => (
                    <td key={header.field[0].title}>
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


