import { useState, useContext } from 'react';

import { IconButtonClose } from '../IconButton/IconButton';
import { MainContext } from '../../DataTable/DataTable';
import './ShowColumns.css'

export default function ShowColumns(): React.JSX.Element {
  const mainContext = useContext(MainContext);

  return (
    <>
      <ul className='show-column' >
        <li className='show-column__title'>
          <span>{mainContext.options?.textLabels?.viewColumns?.title}</span>
          <IconButtonClose width={15} onClick={() => mainContext.setShowMenuSubItems({ ...mainContext.showMenuSubItems, displayColumns: false })} />
        </li>
        <hr />
        {
          mainContext.columnData.map(header => (
            <li key={header.label} title={mainContext.options?.textLabels?.viewColumns?.titleItem}>
              <input id="display-column" type="checkbox" checked={header.option?.display === false ? false : true} onChange={(event) => mainContext.displayColumn(event.target.checked, header.label)} />
              <label htmlFor="display-column">{header.label}</label>
            </li>
          ))
        }
      </ul>
    </>
  )
}