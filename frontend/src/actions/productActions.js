import axios from "axios"
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
       PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL} 
       from "../constants/productConstants"


export const listProducts = () => async(dispatch) => {
    try {

        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data: products } = await axios.get("/api/products")

        dispatch({
            type:  PRODUCT_LIST_SUCCESS,
            payload: products
        })
        
    } catch (ex) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
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