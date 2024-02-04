import {useState, useRef, useContext, useEffect} from 'react';

import { MainContext } from '../../DataTable/DataTable';
import { IconButtonClose } from '../IconButton/IconButton';
import './Search.css';


export default function Search(): React.JSX.Element {
  const mainContext = useContext(MainContext);
  const [options, setOptions] = useState(mainContext.options);
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
      <div className='search' style={{ color: options?.color?.color, backgroundColor: options?.color?.backgroundColor, borderColor: options?.color?.borderColor }}>
        <input type='text' ref={txtSearch} className='search__input' value={searchValue} onChange={(event) => searchTable(event.target.value)} placeholder={mainContext.options?.searchPlaceholder} />
        <button className='search__close' >
          <IconButtonClose width={18} onClick={() => searchTable('')} />
        </button>
      </div>
    </>
  )
}