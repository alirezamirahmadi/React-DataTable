
import { useRef, useState, useEffect, useContext } from 'react'

import { MainContext } from '../../DataTable/DataTable';
import { filterType } from '../../Type/Type'
import { IconButtonAdd, IconButtonClose } from '../IconButton/IconButton';
import './Filter.css'

export default function Filter(): React.JSX.Element {
  const mainContext = useContext(MainContext);
  const [options, setOptions] = useState(mainContext.options);
  const [filterColumn, setFilterColumn] = useState('');
  const [listFilter, setListFilter] = useState<filterType[]>([]);
  const [filterCondition, setFilterCondition] = useState('');
  const [filterText, setFilterText] = useState('');
  const slFilterColumn = useRef<HTMLSelectElement>(null);
  const slFilterCondition = useRef<HTMLSelectElement>(null);

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
    mainContext.handleFilter(listFilter);
  }, [listFilter])

  return (
    <>
      <div className="filter" >
        <div className="filter__title">
          <span>{options?.textLabels?.filter?.title}</span>
          <IconButtonClose width={15} onClick={() => mainContext.setShowMenuSubItems({ ...mainContext.showMenuSubItems, filter: false })} />
        </div>
        <div className="filter-item" style={{ color: options?.color?.color, backgroundColor: options?.color?.backgroundColor, borderColor: options?.color?.borderColor }}>
          <select ref={slFilterColumn} className='filter-item__column' value={filterColumn} onChange={event => setFilterColumn(event.target.value)} >
            <option value='-1'>---</option>
            {
              mainContext.columnData.map(column => (
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
          <IconButtonAdd width={20} title={options?.textLabels?.filter?.add} onClick={addFilter} />
        </div>
        <ul className='filter-list' style={{ color: options?.color?.color, backgroundColor: options?.color?.backgroundColor, borderColor: options?.color?.borderColor }}>
          {
            listFilter.map(filter => (
              <li key={filter.column.value} className='filter-list__li'>
                <span>{filter.column.label} - {filter.condition.label} - {filter.text}</span>
                <IconButtonClose width={15} title={options?.textLabels?.filter?.delete} onClick={() => removeFilter(filter.column.value)} />
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}