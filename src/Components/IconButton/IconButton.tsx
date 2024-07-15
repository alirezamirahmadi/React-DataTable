

export default function IconButton({ svg, title, width, onClick }: { svg: any, title?: string, width: number, onClick?: () => void }): React.JSX.Element {
  return (
    <>
      <div className="icon-button" title={title} onClick={onClick}
        style={{ display: 'inline-block', width, marginInlineEnd: '7px', cursor: 'pointer' }}>
        {svg}
      </div>
    </>
  )
}

function IconButtonShowColumns({ title, width, onClick }: { title?: string, width: number, onClick: () => void }): React.JSX.Element {
  return (
    <>
      <IconButton width={width} onClick={onClick} title={title}
        svg={
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M121-280v-400q0-33 23.5-56.5T201-760h559q33 0 56.5 23.5T840-680v400q0 33-23.5 56.5T760-200H201q-33 0-56.5-23.5T121-280Zm79 0h133v-400H200v400Zm213 0h133v-400H413v400Zm213 0h133v-400H626v400Z" />
          </svg>
        } />
    </>
  )
}

function IconButtonFilter({ title, width, onClick }: { title?: string, width: number, onClick: () => void }): React.JSX.Element {
  return (
    <>
      <IconButton width={width} onClick={onClick} title={title}
        svg={
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z" />
          </svg>
        } />
    </>
  )
}

function IconButtonDownload({ title, width, onClick }: { title?: string, width: number, onClick: () => void }): React.JSX.Element {
  return (
    <>
      <IconButton width={width} onClick={onClick} title={title}
        svg={
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
          </svg>
        } />
    </>
  )
}

function IconButtonPrint({ title, width, onClick }: { title?: string, width: number, onClick: () => void }): React.JSX.Element {
  return (
    <>
      <IconButton width={width} onClick={onClick} title={title}
        svg={
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M640-640v-120H320v120h-80v-200h480v200h-80Zm-480 80h640-640Zm560 100q17 0 28.5-11.5T760-500q0-17-11.5-28.5T720-540q-17 0-28.5 11.5T680-500q0 17 11.5 28.5T720-460Zm-80 260v-160H320v160h320Zm80 80H240v-160H80v-240q0-51 35-85.5t85-34.5h560q51 0 85.5 34.5T880-520v240H720v160Zm80-240v-160q0-17-11.5-28.5T760-560H200q-17 0-28.5 11.5T160-520v160h80v-80h480v80h80Z" />
          </svg>
        } />
    </>
  )
}

function IconButtonSearch({ title, width, onClick }: { title?: string, width: number, onClick: () => void }): React.JSX.Element {
  return (
    <>
      <IconButton width={width} onClick={onClick} title={title}
        svg={
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        } />
    </>
  )
}

function IconButtonDelete({ title, width, onClick }: { title?: string, width: number, onClick: () => void }): React.JSX.Element {
  return (
    <>
      <IconButton width={width} onClick={onClick} title={title}
        svg={
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        } />
    </>
  )
}

function IconButtonAdd({ title, width, onClick }: { title?: string, width: number, onClick: () => void }): React.JSX.Element {
  return (
    <>
      <IconButton width={width} onClick={onClick} title={title}
        svg={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        } />
    </>
  )
}

function IconButtonClose({ title, width, onClick }: { title?: string, width: number, onClick: () => void }): React.JSX.Element {
  return (
    <>
      <IconButton width={width} onClick={onClick} title={title}
        svg={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        } />
    </>
  )
}

function IconButtonArrowUp({ title, width }: { title?: string, width: number }): React.JSX.Element {
  return (
    <>
      <IconButton width={width} title={title}
        svg={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
          </svg>
        } />
    </>
  )
}

function IconButtonArrowDown({ title, width }: { title?: string, width: number }): React.JSX.Element {
  return (
    <>
      <IconButton width={width} title={title}
        svg={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
          </svg>
        } />
    </>
  )
}

function IconButtonFirstPage({ title, width, onClick }: { title?: string, width: number, onClick: () => void }): React.JSX.Element {
  return (
    <>
      <IconButton width={width} onClick={onClick} title={title}
        svg={
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M240-240v-480h80v480h-80Zm440 0L440-480l240-240 56 56-184 184 184 184-56 56Z" />
          </svg>
        } />
    </>
  )
}

function IconButtonPreviousPage({ title, width, onClick }: { title?: string, width: number, onClick: () => void }): React.JSX.Element {
  return (
    <>
      <IconButton width={width} onClick={onClick} title={title}
        svg={
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
          </svg>
        } />
    </>
  )
}

function IconButtonLastPage({ title, width, onClick }: { title?: string, width: number, onClick: () => void }): React.JSX.Element {
  return (
    <>
      <IconButton width={width} onClick={onClick} title={title}
        svg={
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="m280-240-56-56 184-184-184-184 56-56 240 240-240 240Zm360 0v-480h80v480h-80Z" />
          </svg>
        } />
    </>
  )
}

function IconButtonNextPage({ title, width, onClick }: { title?: string, width: number, onClick: () => void }): React.JSX.Element {
  return (
    <>
      <IconButton width={width} onClick={onClick} title={title}
        svg={
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
          </svg>
        } />
    </>
  )
}


export {
  IconButtonShowColumns, IconButtonDownload, IconButtonFilter, IconButtonPrint, IconButtonSearch,
  IconButtonDelete, IconButtonAdd, IconButtonClose, IconButtonArrowUp, IconButtonArrowDown,
  IconButtonFirstPage, IconButtonPreviousPage, IconButtonLastPage, IconButtonNextPage
}