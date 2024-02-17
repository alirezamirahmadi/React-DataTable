import { useContext } from 'react';

import { IconButtonClose } from '../IconButton/IconButton';
import { MainContext } from '../../ReactDataTable/ReactDataTable';
import './ShowColumns.css'

export default function ShowColumns(): React.JSX.Element {
  const mainContext = useContext(MainContext);

  return (
    <>
      <ul data-testid = 'rdt-showcolumn' className='rdtshowcolumn' >
        <li className='rdtshowcolumn__title'>
          <span>{mainContext.options?.textLabels?.viewColumns?.title}</span>
          <IconButtonClose width={15} onClick={() => mainContext.setShowMenuSubItems({ ...mainContext.showMenuSubItems, displayColumns: false })} />
        </li>
        <hr />
        {
          mainContext.columnData.map(header => (
            <li key={header.label} className='rdtshowcolumn__li' title={mainContext.options?.textLabels?.viewColumns?.titleItem}>
              <input data-testid = 'rdt-showcolumn__li' id={header.label} type="checkbox" checked={header.options?.display === false ? false : true} onChange={(event) => mainContext.displayColumn(event.target.checked, header.label)} />
              <label htmlFor={header.label} className='rdtshowcolumn__label' >{header.label}</label>
            </li>
          ))
        }
      </ul>
    </>
  )
}