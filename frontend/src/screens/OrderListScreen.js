import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from 'react-bootstrap';
import Message from "../components/Message";
import { getOrders } from '../actions/orderActions';

const OrderListScreen = ({ history }) => {

  const dispatch = useDispatch()

  const orderList = useSelector(state=> state.orderList)
  const { orders, error } = orderList
  
  const userLogin = useSelector(state=> state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
      if(userInfo && userInfo.isAdmin) {
          dispatch(getOrders())
      } else {
          history.push('/login') //why not '/' for redirecting to homepage.
      }
  }, [dispatch, history, userInfo])

  return (
    <>
        <h2>Orders</h2>
        { error ? <Message variant="red">{error}</Message> : (
            <Table striped bordered hover responsive className="table-sm">
                <thead>
                 <tr>
                    <th>USER ID</th>
                    <th>USER NAME</th>
                   {/*  <th>DATE</th> */}
                    <th>TOTAL PRICE</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                 </tr>
                </thead>
                <tbody>
                  { orders.map(order => (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user && order.user.name}</td>
                        {/* <td>{order.createdAt.substring(0, 10)}</td> */}
                        <td>${order.totalPrice}</td>
                        <td>{order.isPaid? (order.paidAt.substring(0, 10)) 
                         : (<i className="fas fa-times" style={{ color: "red"}}></i>)}</td>
                        <td>{order.isDelivered? (order.deliveredAt.substring(0, 10)) 
                         : (<i className="fas fa-times" style={{ color: "red"}}></i>)}</td>
                       
                        <td>
                            <LinkContainer to={`/orders/${order._id}`}>
                                <Button variant="light" className="btn-sm mx-5">
                                    <i className="fas fa-edit"></i>
                                    Details
                                </Button> 
                            </LinkContainer>
                            
                        </td>
                    </tr>
                  ))}
                </tbody> 
            </Table>
        )} 
    </>
  )
}

export default OrderListScreen
