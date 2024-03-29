import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap"
import Rating from "../components/Rating"
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import { listProductDetails, createProductReview } from "../actions/productActions"
import { addToCart } from '../actions/cartActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'


const ProductScreen = ({ history, match }) => {
    //const product = products.find(p => p._id === match.params.id)
    //const[product, setProduct] = useState([])

    //Quantity is gonna be a part of component level state. So we're gonna be using useState hooks ??????
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch();
    const productId = match.params.id;

    /* My wrong writing: const userLogin = useState(state => state.userLogin) instead of useSelector, I wrote useState
    const { userInfo } = userLogin */

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDetails = useSelector(state => state.productDetails)
    const { loading, product, error } = productDetails

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { success: successProductReview, error: errorProductReview } = productReviewCreate

    useEffect(() => {
        if (successProductReview) {
            alert('Review Submitted!')
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }

        dispatch(listProductDetails(productId))

    }, [dispatch, match, successProductReview, productId])

    const addToCartHandler = () => {
        //history.push(`/cart/${productId}?qty=${qty}`)
        dispatch(addToCart(product._id, qty))
        history.push('/cart')
    }

    const productReviewHandler = (e) => {
        e.preventDefault()

        dispatch(createProductReview(productId, {
            rating,
            comment
        }))
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
            <Meta title={product.name} />
            <Link className="btn btn-warning btn-lg my-3" to="/">Go Back</Link>
            {loading ? <Loader />
                : error ? (<Message variant="red"> {error} </Message>)
                    : (
                        <>
                            <Row>
                                <Col md={6}>
                                    {/* the image was goin out of it's container, to stop that from happening we used fluid */}
                                    <Image src={product.image} alt={product.name} fluid />
                                </Col>

                                <Col md={3}>
                                    <ListGroup variant="flush" >
                                        <ListGroup.Item>
                                            <h3 style={{ color: "#bf00ff" }}>{product.name}</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Price: ${product.price}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Description: {product.description}
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
                                        {product.countInStock > 0 && (
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
                                                disabled={product.countInStock === 0}
                                            > Add to cart </Button>
                                        </ListGroup.Item>
                                    </Card>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <h2>Reviews</h2>
                                    {product.reviews.length === 0 && <Message> No Reviews </Message>}
                                    <ListGroup variant="flush">
                                        {product.reviews.map(review => (
                                            <ListGroup.Item key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating} />
                                                {/* <p>{review.createdAt.substring(0, 10)}</p> */}
                                                <p>{review.comment}</p>
                                            </ListGroup.Item>
                                        ))}
                                        <ListGroup.Item>
                                            <h2>Write a customer review</h2>
                                            {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
                                            {userInfo ? (
                                                <Form onSubmit={productReviewHandler}>
                                                    <Form.Group controlId="rating">
                                                        <Form.Label> Rating </Form.Label>
                                                        <Form.Control
                                                            as="select"
                                                            value={rating}
                                                            onChange={e => setRating(e.target.value)}>
                                                            <option value=''> Select...</option>
                                                            <option value='1'> 1 - Poor</option>
                                                            <option value='2'> 2 - Fair</option>
                                                            <option value='3'> 3 - Good</option>
                                                            <option value='4'> 4 - Very Good</option>
                                                            <option value='5'> 5 - Excellent</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId="comment">
                                                        <Form.Label> Comment </Form.Label>
                                                        <Form.Control
                                                            as="textarea"
                                                            row="3"
                                                            value={comment}
                                                            onChange={e => setComment(e.target.value)} >
                                                            {/* I wrote: WRONG code: "onClick = {e => e.target.value}"  */}
                                                            Comment
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Button type="submit" variant="primary">Submit</Button>
                                                </Form>
                                            ) : (<Message>Please <Link to="/login"> sign in </Link>
                                                to write a review</Message>)}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </>
                    )
            }

        </>
    )
}

export default ProductScreen
