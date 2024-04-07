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
    <div>
      <Card style={{ position: 'relative' }}>
        <Link to={`/store/product/${product.slug}`}>
          <img
            src={product.image}
            className="card-img-top img-fluid card-img"
            alt={product.name}
          />
          <div
            className="mask"
            // style={{
            //   position: 'absolute',
            //   top: 0,
            //   left: 0,
            //   width: '100%',
            //   height: '100%',
            //   background: 'rgba(0, 0, 0, 0.6)', // Color de la máscara
            //   display: 'flex',
            //   justifyContent: 'center',
            //   alignItems: 'center',
            // }}
          >
            <p className="text-white mb-0">Ver detalles</p>
          </div>
        </Link>
        <Card.Body>
          <Link to={`/store/product/${product.slug}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Rating rating={parseInt(product.rating)} numReviews={product.numReviews} />
          <Card.Text>${product.price}</Card.Text>
          
        </Card.Body>
        
      </Card>
      {product.countInStock === 0 ? (
            <Button variant="light" disabled className='w-100'>
              Sin stock
            </Button>
          ) : (
            <Button onClick={() => addToCartHandler(convertProductToCartItem(product))} className='w-100'>
              Agregar al carrito
            </Button>
          )}
    </div>
  )
}

export default ProductItem
