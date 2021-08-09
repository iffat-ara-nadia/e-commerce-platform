import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_PAY_SUCCESS, ORDER_LIST_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_FAIL, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_REQUEST, ORDER_DELIVER_FAIL } from '../constants/orderConstants'
import axios from "axios"
import { ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, 
        ORDER_DETAILS_REQUEST, ORDER_PAY_REQUEST, ORDER_PAY_FAIL, 
        MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL } from './../constants/orderConstants';

export const createOrder = (order) => async(dispatch) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })
     
        //headers.common: use to set token by default in all kinds of http request. 
        axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") 
        const { data } = await axios.post('/api/orders', order)
        console.log( data )
        
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

     } catch (ex) { 
        console.log(ex.response.data);
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: ex.response.data
        })     
    }
}

export const getOrderDetails = (id) => async(dispatch) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })
     
        //headers.common: use to set token by default in all kinds of http request. 
         axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") 
    
        const { data } = await axios.get(`/api/orders/${id}`)
        console.log( data )
        
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

     } catch (ex) { 
        console.log(ex.response.data);
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: ex.response.data
        })     
    }
}

export const payOrder= (orderId, paymentResult) => async(dispatch) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })
     
        //headers.common: use to set token by default in all kinds of http request. 
         axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") 
    
        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult)
        console.log( data )
        
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })

     } catch (ex) { 
        console.log(ex.response.data);
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: ex.response.data
        })     
    }
}

export const deliverOrder= (order) => async(dispatch) => {
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST
        })
     
        //headers.common: use to set token by default in all kinds of http request. 
         axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") 
    
        const { data } = await axios.put(`/api/orders/${order._id}/deliver`, {} )// when to pass empty object?
        console.log( data )
        
        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data
        })

     } catch (ex) { 
        console.log(ex.response.data);
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: ex.response.data
        })     
    }
}

export const getMyOrders = () => async(dispatch) => {
    try {
        dispatch({
            type: MY_ORDER_LIST_REQUEST
        })
     
        //headers.common: use to set token by default in all kinds of http request. 
         axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") 
    
        const { data } = await axios.get('/api/orders/myorders') //???? DATA NOT FETCHED
        console.log( "myorders: " + data )
        
        dispatch({
            type: MY_ORDER_LIST_SUCCESS,
            payload: data
        })

     } catch (ex) { 
        console.log(ex.response.data);
        dispatch({
            type: MY_ORDER_LIST_FAIL,
            payload: ex.response.data
        })     
    }
}

export const getOrders = () => async(dispatch) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
        })
     
        //headers.common: use to set token by default in all kinds of http request. 
         axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") 
    
        const { data } = await axios.get('/api/orders')
        console.log( " All orders by admin: " + data )
        
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })

     } catch (ex) { 
        console.log(ex.response.data);
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: ex.response.data
        })     
    }
}
