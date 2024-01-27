

export default function IconButton({ svg, title, width, onClick }: { svg: any, title?: string, width: number, onClick: () => void }): React.JSX.Element {
  return (
    <>
      <div className="icon-button" title={title} onClick={onClick}
        style={{ display: 'inline-block', width, marginInlineEnd:'7px' }}>
        {svg}
      </div>
    </>
  )
}