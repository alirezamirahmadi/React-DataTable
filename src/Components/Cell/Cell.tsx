import { useContext } from 'react';

import { MainContext } from '../../DataTable/DataTable';
import { ColumnType } from "../../Type/Type";
import './Cell.css';

export default function Cell({ column, row }: { column: ColumnType, row: any }) {
  const mainContext = useContext(MainContext);

  switch (column.kind) {
    case 'text':
      return (
        <>
          {column.field.map((field) => (
            <span key={field.title} className="">{row[field.title]}</span>
          ))}
        </>
      )

    case 'input/textbox':
    case 'input/date':
    case 'input/datetime-local':
    case 'input/number':
    case 'input/file':
    case 'input/password':
      return (
        <>
          {column.field.map((field) => (
            <input key={field.title} value={row[field.title]} onChange={(event) => field.eventHandlerRow && field.eventHandlerRow(event)} type={column.kind.split('/')[1]} />
          ))}
        </>
      )

    case 'textarea':
      return (
        <>
          {column.field.map((field) => (
            <textarea key={field.title} onChange={(event) => field.eventHandlerRow && field.eventHandlerRow(event)} />
          ))}
        </>
      )

    case 'image':
      return (
        <>
          {column.field.map((field) => (
            <img key={field.title} src={row[field.title]} width={70} />
          ))}
        </>
      )

    case 'button':
      return (
        <>
          {column.field.map((field) => (
            <button className="button-field" key={field.title} onClick={() => field.eventHandlerRow && field.eventHandlerRow(row)}>{field.title}</button>
          ))}
        </>
      )

    case 'boolean':
      return (
        <>
          {column.field.map((field) => (
            <input checked={row[field.title]} key={field.title} onChange={(event) => field.eventHandlerRow && field.eventHandlerRow(event)} className='' type='checkbox' />
          ))}
        </>
      )

    case 'progress':
      return (
        <>
          {column.field.map((field) => (
            Array.isArray(row[field.title]) && (row[column.field[0].title]).length === 2 &&
            <progress key={field.title} className="progress-field" value={row[field.title][0]} max={row[field.title][1]}>{row[field.title][0]}</progress>
          ))}
        </>
      )

    case 'select':
      return (
        <>
          {column.field.map((field) => (
            <select key={field.title} className="select-field" onChange={(event) => field.eventHandlerRow && field.eventHandlerRow(event)}
              style={{ color: mainContext.options?.color?.color, backgroundColor: mainContext.options?.color?.backgroundColor, borderColor: mainContext.options?.color?.borderColor }}
            >
              {
                Array.isArray(row[field.title]) &&
                row[field.title].map((value: any) => (
                  <option key={value} className="select-field__option" value={value}>{value}</option>
                ))
              }
            </select>
          ))}
        </>
      )

  }
}