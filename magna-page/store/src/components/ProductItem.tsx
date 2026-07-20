import { useContext } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Store } from '../Store'
import { CartItem } from '../types/Cart'
import { Productos } from '../types/Product'
import { convertProductToCartItem } from '../utils'
import Rating from './Rating'

function ProductItem({ product }: { product: Productos}) {
  const { state, dispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state

  const addToCartHandler = (item: CartItem) => {
    const existItem = cartItems.find((x) => x._id === product.id)
    const quantity = existItem ? existItem.quantity + 1 : 1

    if (product.countInStock < quantity) {
      alert('Sorry. Product is out of stock')
      return
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    })
    toast.success('Product added to the cart')
  }

  return (
    <div className="product-card-wrapper">
      <Card className="product-card">
        <Link to={`/store/product/${product.slug}`} className="card-img-wrapper">
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
            loading="lazy"
          />
          <div className="card-overlay">
            <span className="view-details">Ver detalles</span>
          </div>
        </Link>
        <Card.Body>
          <Link to={`/store/product/${product.slug}`}>
            <Card.Title className="card-title">{product.name}</Card.Title>
          </Link>
          <div className="card-rating">
            <Rating rating={parseInt(product.rating)} numReviews={product.numReviews} />
          </div>

          {product.countInStock === 0 ? (
            <button className="btn-disabled" disabled>
              Sin stock
            </button>
          ) : (
            <button
              className="btn-add-cart"
              onClick={() => addToCartHandler(convertProductToCartItem(product))}
            >
              Agregar al carrito
            </button>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}

export default ProductItem
