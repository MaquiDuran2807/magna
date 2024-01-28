export type Product = {
  _id: number
  name: string
  slug: string
  image: string
  category: number
  brand: string
  price: number
  countInStock: number
  description: string
  rating: number
  numReviews: number
}


export interface Categories {
  id:   number;
  name: string;
}


