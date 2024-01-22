
import DataTable from './DataTable/DataTable';
import { ColumnType } from './Type/Type';

const editProduct = (value: any) => {
  console.log(value);
}
const tableHeader: ColumnType[] = [
  { field: [{ title: 'id' }], label: 'ID', kind: 'text', option:{ display: false } },
  { field: [{ title: 'image' }], label: 'Image', kind: 'image' },
  { field: [{ title: 'pname' }], label: 'Name', kind: 'text' },
  { field: [{ title: 'section' }], label: 'Section', kind: 'text' },
  { field: [{ title: 'price' }], label: 'Price', kind: 'text', option: { sort: true } },
  { field: [{ title: 'stock' }], label: 'Stock', kind: 'text' },
  { field: [{ title: 'click me!', eventHandlerRow: editProduct }], label: 'Modify', kind: 'button' },
]
let products = [
  { id: 1, section: 'Phone', pname: 'Redmi 9', image: 'logo192.png', price: '120', stock: 5 },
  { id: 2, section: 'Phone', pname: 'Redmi Note 10', image: 'logo192.png', price: '160', stock: 12 },
  { id: 3, section: 'Laptop', pname: 'Asus A10', image: 'logo192.png', price: '320', stock: 52 },
  { id: 4, section: 'Laptop', pname: 'hp RE4', image: 'logo192.png', price: '400', stock: 15 },
  { id: 5, section: 'Monitor', pname: 'Samsung 22', image: 'logo192.png', price: '170', stock: 67 },
  { id: 6, section: 'Monitor', pname: 'LG 20', image: 'logo192.png', price: '130', stock: 34 },
]

function App() {

  return (
    <>
      <DataTable direction='rtl' columns={tableHeader} rows={products} />
    </>
  )
}

export default App
