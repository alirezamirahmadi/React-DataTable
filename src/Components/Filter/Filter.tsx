
import { useRef, useState, useEffect, useContext } from 'react'

import { MainContext } from '../../ReactDataTable/ReactDataTable';
import { ColumnType } from '../../Type/Type'
import { IconButtonAdd, IconButtonClose } from '../IconButton/IconButton';
import './Filter.css'

export default function Filter(): React.JSX.Element {
  const mainContext = useContext(MainContext);
  const [filterColumn, setFilterColumn] = useState('');
  const [filterCondition, setFilterCondition] = useState('');
  const [filterText, setFilterText] = useState('');
  const txtFilter = useRef<HTMLInputElement>(null);
  const slFilterColumn = useRef<HTMLSelectElement>(null);
  const slFilterCondition = useRef<HTMLSelectElement>(null);
  const style = { color: mainContext.options?.color?.color, backgroundColor: mainContext.options?.color?.backgroundColor, borderColor: mainContext.options?.color?.borderColor }

  const addFilter = () => {
    if (filterColumn === '-1' || filterCondition === '-1' || filterText === '' ||
      mainContext.listFilter.some(filter => filter.column.value === filterColumn)) {
      return;
    }
    let tempFilter = [...mainContext.listFilter];
    tempFilter.push({ column: { value: filterColumn, label: slFilterColumn.current ? getTextOfSelect(slFilterColumn.current, filterColumn) : '' }, condition: { value: filterCondition, label: slFilterCondition.current ? getTextOfSelect(slFilterCondition.current, filterCondition) : '' }, text: filterText, });
    mainContext.setListFilter(tempFilter);
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
    let tempFilter = mainContext.listFilter.filter(filter => filter.column.value != column);
    mainContext.setListFilter(tempFilter);
  }

  useEffect(() => {
    txtFilter.current?.focus();
  }, [filterColumn, filterCondition])

  return (
    <>
      <div data-testid='rdt-filter' className="rdtfilter" >
        <div className="rdtfilter__title">
          <span>{mainContext.options?.textLabels?.filter?.title}</span>
          <IconButtonClose width={15} onClick={() => mainContext.setShowMenuSubItems({ ...mainContext.showMenuSubItems, filter: false })} />
        </div>
        <div className="rdtfilter-item" style={style}>
          <select ref={slFilterColumn} className='rdtfilter-column' value={filterColumn} onChange={event => setFilterColumn(event.target.value)} >
            <option value='-1'>---</option>
            {
              mainContext.columnData.map((column: ColumnType) => {
                if (column.options?.filter != false) {
                  return <option key={column.label} className='rdtfilter-column__option' value={column.field.title}>{column.label}</option>
                }
              }
              )
            }
          </select>
          <select ref={slFilterCondition} className='rdtfilter-condition' value={filterCondition} onChange={event => setFilterCondition(event.target.value)} >
            <option className='rdtfilter-condition__option' value='-1'>---</option>
            <option className='rdtfilter-condition__option' value="Equal">Equal</option>
            <option className='rdtfilter-condition__option' value="NotEqual">Not Equal</option>
            <option className='rdtfilter-condition__option' value="Include">Include</option>
            <option className='rdtfilter-condition__option' value="DontInclude">Don't Include</option>
          </select>
          <input ref={txtFilter} className='rdtfilter-item__text' type="text" value={filterText} onChange={event => setFilterText(event.target.value)} />
          <IconButtonAdd width={20} title={mainContext.options?.textLabels?.filter?.add} onClick={addFilter} />
        </div>
        <ul className='rdtfilter-list' style={style}>
          {
            mainContext.listFilter.map(filter => (
              <li key={filter.column.value} className='rdtfilter-list__li'>
                <span>{filter.column.label} - {filter.condition.label} - {filter.text}</span>
                <IconButtonClose width={15} title={mainContext.options?.textLabels?.filter?.delete} onClick={() => removeFilter(filter.column.value)} />
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}