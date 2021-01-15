import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Image, Button, ListGroup, Card } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails } from '../actions/orderActions';

const OrderScreen = ({ match }) => {
    const orderId = match.params.id
    const dispatch = useDispatch()
    
    const orderDetails = useSelector(state=> state.orderDetails)
    const { order, loading, error } = orderDetails

 /*    useEffect(() => {
        dispatch(getOrderDetails(orderId))  
    }, []) */

    //Corrected version: 
  //???? /* In the OrderScreen useEffect(), check for the order and also make sure that the order ID matches the ID in the URL. If it does not, then dispatch getOrderDetails() to fetch the most recent order */
    useEffect(() => {
        if(!order || order._id !== orderId) {
            dispatch(getOrderDetails(orderId))
        }
    }, [order, orderId]) 

  return ( 
    loading ? <Loader /> : error ? <Message variant="danger"> {error} </Message> :
    <>
    <h2>Order {order._id}</h2>
     <Row>
        <Col md={8}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p><strong>Name: </strong>
                    <span style={{textTransform: "capitalize", color:"lightSalmon"}}>
                    { order.user.name }</span></p>
                    <p>
                    <strong>Email: </strong>
                    {/* what does mailto mean? any other way? */}
                    <a href={`mailto: ${order.user.email}`}>{order.user.email}</a>
                    </p>
                    <p>
                        <strong>Address: </strong>
                        {order.shippingAddress.address},  {order.shippingAddress.city}{' '}
                        {order.shippingAddress.postalCode}, {order.shippingAddress.country}  
                    </p>
                   {order.isDelivered ? <Message variant="success">Delivered on {order.deliveredAt}</Message> 
                    : <Message variant="warning">Not Delivered</Message>}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                        <strong>Method:  </strong>
                        {order.paymentMethod}
                    </p>
                    {order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message> : 
                    <Message variant="danger">Not Paid</Message>}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
                        <ListGroup variant="flush">
                            {order.orderItems.map(( item, index )=> (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col>
                                        <Link to={`/products/${item._id}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} x ${item.price} = ${item.qty * item.price}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </ListGroup.Item>
            </ListGroup>
        </Col>

        <Col md={4}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Items</Col>
                        <Col>${order.itemsPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Shipping</Col>
                        <Col>${Number(order.shippingPrice).toFixed(2)}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Tax</Col>
                        <Col>${Number(order.taxPrice).toFixed(2)}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Total</Col>
                        <Col>${Number(order.totalPrice).toFixed(2)}</Col>
                    </Row>
                </ListGroup.Item>

            </ListGroup>
        </Col>
     </Row>  
    </>
  )
}

export default OrderScreen
