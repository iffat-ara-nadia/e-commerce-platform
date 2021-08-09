import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Meta from '../components/Meta'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = ({ match }) => {
    const dispatch = useDispatch()

    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    //productList the same name as used in store
    const productList = useSelector(state => state.productList)
    const { loading, products, page, pages, error } = productList
    
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
        dispatch(listProducts(keyword, pageNumber)) //dispatch will fire off the listProduct() action

    }, [dispatch, keyword, pageNumber]) //keyword should be add as dependency, so whenever keyword changed, the search button works 
    //otherwise, search button doesn't work 2nd time after looking for a keyword.

  return (
   <>
    <Meta />
    { !keyword ? <ProductCarousel /> : <Link to='/' className="btn btn-warning">Go Back</Link>}
    <h1 className="text-center">Latest Products</h1>
    {loading ? <Loader />
    : error ? <h3>{error}</h3>
    : (
    <>
      <Row>
        {products.map(product => (
            //I wrote the map fn outside <Row> once and then inside <Col>. Both are wrong.
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                {/* <h3>{product.name}</h3> */}
                <Product product={ product } />
            </Col>
        ))}
     </Row>
     <Paginate
       pageNumber={page}
       pages={pages}
       keyword={keyword ? keyword : ''}
     />
     </>
     )
     }
   </>
  )
}

export default HomeScreen
