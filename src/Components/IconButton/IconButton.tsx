

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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" />
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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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




export {
  IconButtonShowColumns, IconButtonDownload, IconButtonFilter, IconButtonPrint, IconButtonSearch,
  IconButtonDelete, IconButtonAdd, IconButtonClose, IconButtonArrowUp, IconButtonArrowDown
}