import { useContext, useState, useEffect } from 'react';

import { MainContext } from '../../DataTable/DataTable';
import { ColumnType, elemEventType } from "../../Type/Type";
import './Cell.css';



export default function Cell({ column, row }: { column: ColumnType, row: any }) {
  const mainContext = useContext(MainContext);
  const [cellValue, setCellValue] = useState<string>('');

  const onChangeInput = (event: elemEventType, eventFunction?: (event:elemEventType) => void) => {
    setCellValue(event.target.value);
    eventFunction && eventFunction(event);
  }

  useEffect(() => {
    switch (column.kind) {
      case 'input/textbox':
      case 'input/date':
      case 'input/datetime-local':
      case 'input/number':
      case 'input/file':
      case 'input/password':
      case 'textarea':
        setCellValue(row[column.field[0].title]);
        break;
      case 'select':
        setCellValue(row[column.field[0].title]?.value ? row[column.field[0].title].value : '');
        break;
    }

  }, [])

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
          <input key={column.field[0].title} value={cellValue} onChange={(event) => onChangeInput(event, column.field[0].eventHandlerRow)} type={column.kind.split('/')[1]} />
        </>
      )

    case 'textarea':
      return (
        <>
          <textarea key={column.field[0].title} value={cellValue} onChange={(event) => onChangeInput(event, column.field[0].eventHandlerRow)} />
        </>
      )

    case 'image':
      return (
        <>
          {column.field.map((field) => (
            <img key={field.title} src={row[field.title]} width={mainContext.options?.cells?.imageWidth} />
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
            row[field.title] && row[field.title].options.includes(row[field.title].value) &&
            <select key={field.title} value={cellValue} className="select-field" onChange={(event) => onChangeInput(event, column.field[0].eventHandlerRow)}
              style={{ color: mainContext.options?.color?.color, backgroundColor: mainContext.options?.color?.backgroundColor, borderColor: mainContext.options?.color?.borderColor }}
            >
              {
                Array.isArray(row[field.title].options) &&
                row[field.title].options.map((value: any) => (
                  <option key={value} className="select-field__option" value={value}>{value}</option>
                ))
              }
            </select>
          ))}
        </>
      )

  }
}