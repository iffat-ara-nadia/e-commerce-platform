import axios from "axios"
import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_TOP_FAIL, PRODUCT_TOP_REQUEST, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST } from "../constants/productConstants";
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_FAIL, PRODUCT_CREATE_SUCCESS, PRODUCT_UPDATE_SUCCESS, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_TOP_SUCCESS } from './../constants/productConstants';
import {PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL} from "../constants/productConstants"


export const listProducts = (keyword = '', pageNumber = '' ) => async(dispatch) => {
    try {

        dispatch({ type: PRODUCT_LIST_REQUEST })
         /* My Wrong code: await axios.get(`/api/products/${keyword}`) */
         //For 2 or more Query Strings, first one '?' and rest would be '&'

         /* GET /api/products?keyword=sdsss%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20&pageNumber= 304 */
        //I got this error because I used line break between keyword and &pageNumber=${pageNumber}. That's why I cudn't get  latest products on Homescreen
         const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
        console.log(data)                                               

        dispatch({
            type:  PRODUCT_LIST_SUCCESS,
            payload: data
        })
        
    } catch (ex) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: ex.response.data
        })
    }
}

export const getTopRatedProducts = () => async(dispatch) => {
    try {

        dispatch({ type: PRODUCT_TOP_REQUEST })
         const { data } = await axios.get('/api/products/top')
        console.log(data)                                               

        dispatch({
            type:  PRODUCT_TOP_SUCCESS,
            payload: data
        })
        
    } catch (ex) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: ex.response.data
        })
    }
}

export const listProductDetails = (id) => async(dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)   //wrong:("/api/products/:id")
        console.log(data)
        dispatch({
            type:  PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
        
    } catch (ex) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: ex.response.data
          
        })
    }
}

export const createProduct = () => async(dispatch) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })
     
        //headers.common: use to set token by default in all kinds of http request. 
         axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") 
    
        const { data } = await axios.post(`/api/products`, {}) //???{} -> BECAUSE WE'RE making a post request, but we're not sending any data here. 
        console.log(data)

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data //newly created product.
        })

     } catch (ex) { 
        console.log(ex.response.data);
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: ex.response.data
        })     
    }
}

export const updateProduct = (product) => async(dispatch) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })
     
        //headers.common: use to set token by default in all kinds of http request. 
         axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") 
    
        const { data } = await axios.put(`/api/products/${product._id}`, product) 
        console.log(data)

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data 
        })

     } catch (ex) { 
        console.log(ex.response.data);
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: ex.response.data
        })     
    }
}

export const deleteProduct = (id) => async(dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })
     
        //headers.common: use to set token by default in all kinds of http request. 
         axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") 
    
        await axios.delete(`/api/products/${id}`) 
        
        dispatch({
            type: PRODUCT_DELETE_SUCCESS
        })

     } catch (ex) { 
        console.log(ex.response.data);
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: ex.response.data
        })     
    }
}

export const createProductReview = (productId, review) => async(dispatch) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })
     
        //headers.common: use to set token by default in all kinds of http request. 
         axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") 
    
        await axios.post(`/api/products/${productId}/reviews`, review) 
        
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS
        })

     } catch (ex) { 
        console.log(ex.response.data);
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: ex.response.data
        })     
    }
}
