import React from 'react';
import DataTable from '../../src/ReactDataTable/ReactDataTable';
import { ProductsData } from '../ExampleData/ExampleData';
import { ColumnType } from '../../src/Type/Type';

const ModifyStock = ({ value, onChange, rowData }: { value: string, onChange: (event: any) => void, rowData: any }): React.JSX.Element => {
  const addCount = ()=> {
    onChange((preValue:number) => preValue + 1);
  }
  const minusCount = ()=> {
    onChange((preValue:number) => preValue - 1);
  }
  
  return (
    <>
      <div style={{ display: 'flex'}}>
        <input type="button" value="-" style={{ width: '20px' }} onClick={minusCount}/>
        <input type="text" value={value} onChange={event=> onChange(event.target.value)} style={{ width: '20px' }} />
        <input type="button" value="+" style={{ width: '20px' }} onClick={addCount}/>
      </div>
    </>
  )
}
const ProductCard = ({ value, onChange, rowData }: { value: string, onChange: (event: any) => void, rowData: any }): React.JSX.Element => {
  return (
    <>
      <div style={{ border: '1px solid', borderRadius: '10px', width: '200px', padding: '10px' }}>
        <img src={rowData.image} alt={rowData.title} width={150} />
        <p style={{ borderTop: '1px solid', marginBottom: '10px', paddingTop: '10px' }}>{rowData.title}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{rowData.price}$</span>
          <div style={{ display: 'flex', justifyItems: 'center' }}>
            <svg style={{ height: '25px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
            <span style={{ paddingTop: '5px' }}>{rowData.rating[0]}</span>
          </div>
        </div>
      </div>
    </>
  )
}
const columns: ColumnType[] = [
  {
    field: { title: 'card' }, label: 'Card', kind: 'component', options: {
      component: (value, onChange, rowData) => (<ProductCard value={value} onChange={(event: any) => onChange(event.target.value)} rowData={rowData} />)
    }
  },
  { field: { title: 'category' }, label: 'Category', },
  {
    field: { title: 'stock' }, label: 'Stock', kind: 'component', options: {
      component: (value, onChange, rowData) => (<ModifyStock value={value} onChange={onChange} rowData={rowData} />)
    }
  },
  { field: { title: 'date' }, label: 'Add date', },
  { field: { title: 'description' }, label: 'Description', },
]

export default function Example(): React.JSX.Element {
  return (
    <DataTable rows={ProductsData} columns={columns} options={{ color:{color:'#fff', backgroundColor:'#000', borderColor:'#666'}, cells: { imageWidth: 45 } }} />
  )
}