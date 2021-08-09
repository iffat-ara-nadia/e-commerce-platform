import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { getTopRatedProducts } from '../actions/productActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const topRatedProducts = useSelector(state => state.topRatedProducts)
  const { products, loading, error } = topRatedProducts


  useEffect(() => {

    dispatch(getTopRatedProducts())

  }, [dispatch])

  return (
    loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
    (
        <Carousel pause="hover" className="bg-dark">
            {products.map(product => (
                <Carousel.Item key={product._id}>
                    <Link to={`/products/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid/> {/* fluid -> to keep the image inside container */}
                        <Carousel.Caption className="carousel-caption">
                            <h2>{product.name} (${product.price})</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>

            ))}

        </Carousel>
    )
  )
}

export default ProductCarousel
