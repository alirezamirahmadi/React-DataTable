
import Cell from '../Cell/Cell'
import { DataTableType } from '../Type/Type'
import './DataTable.css'

export default function DataTable({ direction = 'rtl', columns, rows }:DataTableType) {
  return (
    <div dir={direction}>
      {
        rows.length === 0 &&
        <div className="alert alert-danger mx-5">No data found</div>
      }
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            {
              columns.map(header => (
                <th key={header.field[0].title}>{header.label}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            rows.map((data:any) => (
              <tr key={data.id}>
                {
                  columns.map((column) => (
                    <td key={column.field[0].title}>
                      <Cell column={column} row={data} />
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


