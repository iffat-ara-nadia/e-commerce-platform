import axios  from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants"
import { CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from './../constants/cartConstants';

export const addToCart = (id, qty) => async(dispatch, getState) => {

    const { data : product } = await axios.get(`/api/products/${id}`)
    console.log(product)  ///Initially for a long time, i couldn't get data from this link.
    //So I checked if id parameter is passed properly.Then i went back to cartScreen & found that I couldn't get 
    //productId from "match.params.id". After that, I checked Route in App.js....where i wrote
    // path={"/cart"} instead of "/cart/:id?" .Here id? paramerter must be added coz, this link 
    //can be accessed directly either from cart nav link or addToCart action where id is passed.

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
             _id: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            qty
        }
    })

    //Once we dispatch this we wanna save it to the local Storage
    //we will get JS object, so we need to convert it to JSON file(using JSON.stringify) 
    //because we only can save strings in the localStorage

    //MY QUESTION: do we really need JSON.stringify or store in JSON format?
    localStorage.setItem('cartItems:', JSON.stringify(getState().cart.cartItems))

}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })
    
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })
    
    localStorage.setItem("shippingAddress", JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })
    
    localStorage.setItem("paymentMethod", JSON.stringify(data))
}
