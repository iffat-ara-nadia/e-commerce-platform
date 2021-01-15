import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from "../components/Product"
import Loader from '../components/Loader';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
    const dispatch = useDispatch()

    //productList the same name as used in store
    const productList = useSelector(state => state.productList)
    const { loading, products, error } = productList
    
    useEffect(() => {
        //const [products, setProducts] = useState([]); [outside of this function]
       /*  //we can't write async to outside function.
        const fetchProducts = async() => {
            const { data } = await axios.get("/api/products")
            console.log(data)

            setProducts(data)
        }
        fetchProducts()
         //eslint-disable-next-line */


         //makes the request to the backend to get products
        dispatch(listProducts()) //dispatch will fire off the listProduct() action

    }, [dispatch])

  return (
      <>
    <h1 className="text-center">Latest Products</h1>
    {loading ? <Loader />
    : error ? <h3>{error}</h3>
    : <Row>
        {products.map(product => (
            //I wrote the map fn outside <Row> once and then inside <Col>. Both are wrong.
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                {/* <h3>{product.name}</h3> */}
                <Product product={ product } />
            </Col>
        ))}
     </Row>
     }
    </>
  )
}

export default HomeScreen
