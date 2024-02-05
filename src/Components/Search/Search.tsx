import {useState, useRef, useContext, useEffect} from 'react';

import { MainContext } from '../../DataTable/DataTable';
import { IconButtonClose } from '../IconButton/IconButton';
import './Search.css';


export default function Search(): React.JSX.Element {
  const mainContext = useContext(MainContext);
  const [searchValue, setSearchValue] = useState('');
  const txtSearch = useRef<HTMLInputElement>(null);

  const searchTable = (value: string) => {
    setSearchValue(value);
    mainContext.handleSearch(value);
    txtSearch.current?.focus();
  }

  useEffect(() => {
    txtSearch.current?.focus();
  }, [])

  return (
    <>
      <div className='rdtsearch' style={{ color: mainContext.options?.color?.color, backgroundColor: mainContext.options?.color?.backgroundColor, borderColor: mainContext.options?.color?.borderColor }}>
        <input type='text' ref={txtSearch} className='rdtsearch__input' value={searchValue} onChange={(event) => searchTable(event.target.value)} placeholder={mainContext.options?.searchPlaceholder} />
        <button className='rdtsearch__close' >
          <IconButtonClose width={18} onClick={() => searchTable('')} />
        </button>
      </div>
    </>
  )
}