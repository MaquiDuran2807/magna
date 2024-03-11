export interface Productos {
  id:           number;
  category:     Category;
  name:         string;
  slug:         string;
  image:        string;
  brand:        string;
  price:        string;
  countInStock: number;
  description:  string;
  rating:       string;
  numReviews:   number;
}

export interface Category {
  id:   number;
  name: string;
}



