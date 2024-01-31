import { useState, useRef, useEffect, useContext } from 'react';

import { MainContext } from '../../DataTable/DataTable';
import Cell from '../Cell/Cell';
import Pagination from '../Pagination/Pagination';
import './Table.css';
import { IconButtonArrowDown, IconButtonArrowUp } from '../IconButton/IconButton';

export default function Table() {
  const mainContext = useContext(MainContext);
  const [currentRows, setCurrentRows] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowPerPage, setRowPerPage] = useState<number>(10);
  const sortedField = useRef({ title: '', kind: true });


  const sortData = (fieldTitle: string) => {
    let tempData = [...mainContext.rowData];
    tempData.sort((a: any, b: any) => {
      const nameA = typeof a[fieldTitle] === 'string' ? a[fieldTitle].toUpperCase() : a[fieldTitle];
      const nameB = typeof b[fieldTitle] === 'string' ? b[fieldTitle].toUpperCase() : b[fieldTitle];
      return nameA < nameB ? (sortedField.current.kind ? -1 : 1) : (sortedField.current.kind ? 1 : -1);
    });
    sortedField.current.title = fieldTitle;
    sortedField.current.kind = !sortedField.current.kind;
    mainContext.setRowData(tempData);
  }

  const selectAllRows = (checked: boolean) => {
    let selectRow = (document.querySelectorAll('.td-select-row') as NodeListOf<HTMLInputElement>);
    selectRow.forEach(element => {
      element.checked = checked;
    })
    mainContext.setCountSelectedRows(checked ? selectRow.length : 0);
  }

  const selectRow = (checked: boolean, rowData: any) => {
    mainContext.setCountSelectedRows(checked ? mainContext.countSelectedRows + 1 : mainContext.countSelectedRows - 1);
  }

  const pageNoHandler = (pageNo: number, perPage: number) => {
    setCurrentPage(pageNo);
    setRowPerPage(perPage);
  }

  const pagination = () => {
    let tempRows = [...mainContext.rowData].splice((currentPage - 1) * rowPerPage, rowPerPage);
    setCurrentRows(tempRows);
  }

  const closeMenuSubItems = () => {
    mainContext.setShowMenuSubItems({ filter: false, search: false, displayColumns: false });
  }

  useEffect(() => {
    pagination();
  }, [currentPage, mainContext.rowData])

  useEffect(() => {
    currentPage != 1 ? setCurrentPage(1) : pagination();
  }, [rowPerPage])

  return (
    <div id='div-table' style={{ color: mainContext.options?.color?.color, backgroundColor: mainContext.options?.color?.backgroundColor, borderColor: mainContext.options?.color?.borderColor }}>
      <table id='data-table' className='table' onClick={closeMenuSubItems}>
        <thead>
          <tr className='tr-head'>
            <th style={{ borderColor: mainContext.options?.color?.borderColor }}>
              <input type="checkbox" onChange={event => selectAllRows(event.target.checked)} />
            </th>
            {
              mainContext.columnData.map(header => (
                <th key={header.field[0].title} style={{ borderColor: mainContext.options?.color?.borderColor, display: header.option?.display === false ? 'none' : 'table-cell' }} onClick={() => header.option?.sort && sortData(header.field[0].title)}>
                  <span className='tr-head__header-label' title={header.option?.sort ? mainContext.options?.textLabels?.body?.toolTip : ''}>{header.label}</span>
                  {sortedField.current.title === header.field[0].title && !sortedField.current.kind && <IconButtonArrowDown width={15} />}
                  {sortedField.current.title === header.field[0].title && sortedField.current.kind && <IconButtonArrowUp width={15} />}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            currentRows.map((data: any) => (
              <tr key={data.id} className='tr-body'>
                <td className='tr-body__select-row' style={{ borderColor: mainContext.options?.color?.borderColor }}>
                  <input type="checkbox" className='td-select-row' onChange={(event) => selectRow(event.target.checked, data)} />
                </td>
                {
                  mainContext.columnData.map((header) => (
                    <td key={header.field[0].title} className='tr-body__data' style={{ borderColor: mainContext.options?.color?.borderColor, display: header.option?.display === false ? 'none' : 'table-cell' }}>
                      <div className="cell-data">
                        <span className='cell-data__label'>{header.label}</span>
                        <Cell column={header} row={data} />
                      </div>
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
      {
        mainContext.rowData.length === 0 &&
        <div className="alert-nodata">{mainContext.options?.textLabels?.body?.noMatch}</div>
      }
      <Pagination pageCount={Math.ceil(mainContext.rowData.length / rowPerPage)} currentPage={currentPage} pageNoHandler={pageNoHandler} previous next first last />
    </div>
  )
}


