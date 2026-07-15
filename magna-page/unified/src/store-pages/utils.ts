import { CartItem } from './types/Cart'
import { Productos} from './types/Product'
import { ApiError } from './types/ApiError'

export const getError = (error: unknown) => {
  const apiError = error as ApiError
  return apiError.response && apiError.response.data.message
    ? apiError.response.data.message
    : (error as Error).message
}

export const convertProductToCartItem = (product: Productos): CartItem => {
  const cartItem: CartItem = {
    _id: product.id,
    name: product.name,
    slug: product.slug,
    image: product.image,
    price: parseFloat(product.price),
    countInStock: product.countInStock,
    quantity: 1,
  }
  return cartItem
}
