
import { ColumnType } from "../../Type/Type"

export default function Cell({ column, row }: { column: ColumnType, row: any }) {
  switch (column.kind) {
    case 'text':
      return (
        <>
          {column.field.map((field) => (
            <span key={field.title} className="">{row[field.title]}</span>
          ))}
        </>
      )
    case 'textBox':
      return (
        <>
          {column.field.map((field) => (
            <input key={field.title} onChange={(event) => field.eventHandlerRow && field.eventHandlerRow(event)} className='form-control' type='text' />            
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
            <button key={field.title} onClick={() => field.eventHandlerRow && field.eventHandlerRow(row)} className="icon-btn">{field.title}</button>
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

  }
}