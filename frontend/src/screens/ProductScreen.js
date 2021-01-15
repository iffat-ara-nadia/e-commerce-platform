import React, { useState, useEffect } from 'react' 
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap"
import Rating from "../components/Rating"
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from "../actions/productActions"


const ProductScreen = ({ history, match }) => {
    //const product = products.find(p => p._id === match.params.id)
    //const[product, setProduct] = useState([])

//Quantity is gonna be a part of component level state. So we're gonna be using useState hooks ??????
    const [qty, setQty] = useState(1)
     
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails)
    const {loading, product, error } = productDetails


    useEffect(() => {
        dispatch(listProductDetails(match.params.id))

    }, [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }


  /*   useEffect(() => {
        const fetchProduct = async() => {
            const { data } = await axios.get(`/api/products/${match.params.id}`)
            console.log(data)
            setProduct(data)
        }
        
        fetchProduct()
        //eslint-disable-next-line
    }, [match])  *///match.params.id should be added as a dependency.(though i wasn't given the warning)

    return (
    //Identifier expected. (what does identifier expected means?) 'const' is a reserved word that cannot be used here.
    //const product = products.find(product => product._id === match.params.id)

    <>
      <Link className="btn btn-warning btn-lg my-3" to="/">Go Back</Link>
      {loading ? <Loader /> 
      : error ? <Message variant="red"> {error} </Message>
      : 
      <Row>
          <Col md={6}>
        {/* the image was goin out of it's container, to stop that from happening we used fluid */}
              <Image src={product.image} alt={product.name} fluid/>
          </Col>

          <Col md={3}>
              <ListGroup variant="flush" >
                <ListGroup.Item>
                    <h3 style={{color: "#bf00ff"}}>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>
                   Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: ${product.description}
                </ListGroup.Item>
              </ListGroup>
          </Col>
          <Col md={3}>
              <Card>
                  <ListGroup.Item>
                      <Row>
                          <Col>Price:</Col>
                          <Col> ${product.price}</Col>
                      </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <Row>
                          <Col>Status:</Col>
                          <Col>
                           {product.countInStock > 0 ? "In stock" : "Out of stock"}
                          </Col>
                      </Row>
                  </ListGroup.Item>
                { product.countInStock > 0 && (
                    <ListGroup.Item>
                        <Row>
                            <Col> Qty: </Col>
                            <Col>
                                <Form.Control as="select" 
                                value={qty}
                                onChange={e => setQty(e.target.value)}
                                >
                                    {[...Array(product.countInStock).keys()].map(x => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))
                                    }
                                </Form.Control>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                )
                }
                  <ListGroup.Item>
                      <Button 
                      onClick={addToCartHandler}
                      className="btn-block" 
                      type="button" //not necessary, type="button"...I think
                      disabled={product.countInStock === 0 }
                      > Add to cart </Button>
                  </ListGroup.Item>
              </Card>
          </Col>
      </Row>
     } 

    </>
  )
}

export default ProductScreen
