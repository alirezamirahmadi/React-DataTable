type ProductType = {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: number[],
  stock: number,
  date: string,
  active: boolean,
  color: { index: number, options: string[] }
}


export type { ProductType }