import { useContext, useState, useEffect } from 'react';

import { MainContext } from '../../ReactDataTable/ReactDataTable';
import { ColumnType, elemEventType } from "../../Type/Type";
import { extractField } from '../../utils/functions';
import './Cell.css';


export default function Cell({ column, row }: { column: ColumnType, row: any }): React.JSX.Element {
  const mainContext = useContext(MainContext);
  const [cellValue, setCellValue] = useState<any>('');
  const [checkboxValue, setCheckboxValue] = useState<boolean>(false);
  const [componentValue, setComponentValue] = useState<any>('');
  const style = { color: mainContext.options?.color?.color, backgroundColor: mainContext.options?.color?.backgroundColor, borderColor: mainContext.options?.color?.borderColor }

  const onChangeInput = (event: elemEventType, eventFunction?: (event: elemEventType) => void) => {
    setCellValue(event.target.value);
    eventFunction && eventFunction(event);
  }
  const onChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>, eventFunction?: (event: elemEventType) => void) => {
    setCheckboxValue(event.target.checked);
    eventFunction && eventFunction(event);
  }
  const onChangeComponent = (value: any) => {
    setComponentValue(value);
  }

  useEffect(() => {
    switch (column.kind) {
      case 'input/textbox':
      case 'input/date':
      case 'input/datetime-local':
      case 'input/number':
      case 'input/password':
      case 'textarea':
        setCellValue(extractField(row, column.field.title));
        break;
      case 'select':
        setCellValue(extractField(row, column.field.title)?.index && extractField(row, column.field.title)?.options && extractField(row, column.field.title)?.index < extractField(row, column.field.title)?.options.length ? extractField(row, column.field.title).options[extractField(row, column.field.title)?.index] : extractField(row, column.field.title)?.options[0]);
        break;
      case 'boolean':
        setCheckboxValue(extractField(row, column.field.title) ? extractField(row, column.field.title) : false);
        break;
      case 'component':
        setComponentValue(extractField(row, column.field.title));
        break;
    }

  }, [])

  switch (column.kind) {

    case 'input/textbox':
    case 'input/date':
    case 'input/datetime-local':
    case 'input/number':
    case 'input/password':
      return (
        <>
          <input value={cellValue} onChange={(event) => onChangeInput(event, column.field.eventHandlerRow)} className='rdtcell-input' type={column.kind.split('/')[1]} />
        </>
      )

    case 'textarea':
      return (
        <>
          <textarea value={cellValue} onChange={(event) => onChangeInput(event, column.field.eventHandlerRow)} className='rdtcell-textarea' />
        </>
      )

    case 'image':
      return (
        <>
          <img src={extractField(row, column.field.title)} width={mainContext.options?.cells?.imageWidth} className='rdtcell-image' />
        </>
      )

    case 'button':
      return (
        <>
          <button onClick={() => column.field.eventHandlerRow && column.field.eventHandlerRow(row)} className="rdtcell-button" >{column.field.title}</button>
        </>
      )

    case 'boolean':
      return (
        <>
          <input checked={checkboxValue} onChange={(event) => onChangeCheckbox(event, column.field.eventHandlerRow)} className='rdtcell-checkbox' type='checkbox' />
        </>
      )

    case 'progress':
      return (
        <>
          {
            Array.isArray(extractField(row, column.field.title)) && (extractField(row, column.field.title)).length === 2 &&
            <progress className="rdtcell-progress" value={extractField(row, column.field.title)[0]} max={extractField(row, column.field.title)[1]}>{extractField(row, column.field.title)[0]}</progress>
          }
        </>
      )

    case 'select':
      return (
        <>
          {
            extractField(row, column.field.title) &&
            <select value={cellValue} className="rdtcell-select" onChange={(event) => onChangeInput(event, column.field.eventHandlerRow)}
              style={style}
            >
              {
                Array.isArray(extractField(row, column.field.title).options) &&
                extractField(row, column.field.title).options.map((value: any) => (
                  <option key={value} className="rdtcell-select__option" value={value}>{value}</option>
                ))
              }
            </select>
          }
        </>
      )
    case 'component':
      return (
        <>
          {column.options?.component && column.options?.component(componentValue, (value) => onChangeComponent(value), row)}
        </>
      )
    default:
      return (
        <>
          <span className='rdtcell-text'>{extractField(row, column.field.title)}</span>
        </>
      )
  }
}