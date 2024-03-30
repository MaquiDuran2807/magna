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
    console.log('quantity', quantity, 'existItem', existItem, 'item', item);
    
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
    <Card>
      <Link to={`/store/product/${product.slug}`}>
        <img src={product.image} className="card-img-top img-fluid" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/store/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={parseInt(product.rating)} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(convertProductToCartItem(product))}
          >
            Agregar al carrito
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default ProductItem
