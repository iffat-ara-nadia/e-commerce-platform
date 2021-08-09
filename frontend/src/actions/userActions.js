import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_UPDATE_PROFILE_SUCCESS, USER_DETAILS_RESET, USER_DELETE_REQUEST, USER_DELETE_FAIL } from "../constants/userConstants"
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from '../constants/userConstants';
import { USER_DETAILS_REQUEST, USER_DETAILS_FAIL, USER_DETAILS_SUCCESS } from '../constants/userConstants';
import { USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST } from '../constants/userConstants';
import { USER_LIST_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_RESET, USER_DELETE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_FAIL, USER_UPDATE_SUCCESS } from './../constants/userConstants';
import { MY_ORDER_LIST_RESET } from "../constants/orderConstants";
import axios from "axios"

export const login = (email, password) => async(dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const response  = await axios.post("/api/login", { email, password })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: response.data
        })

        setItemLocalStorage(response.data, response.headers["x-auth-token"] )

    } catch (ex) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: ex.response.data      
        })     
    }
}

export const register = (name, email, password) => async(dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

    
        const response = await axios.post("/api/register", { name, email, password })
        console.log(response)
        
     
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: response.data
        })

        //when a user register, she/he will be logged in right away.
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: response.data
        })

        // To access custom token headers['x-auth-token'] from the client side, have to add a header method in backend (ref. register.js)
        setItemLocalStorage(response.data, response.headers["x-auth-token"] )

     } catch (ex) { //difference between ex and error??
        console.log(ex.response.data);
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: ex.response.data
        })     
    }
}

export const getUserDetails = () => async(dispatch) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })
     
        //headers.common: use to set token by default in all kinds of http request. 
         axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") //this line: from Mosh
    
        const { data } = await axios.get('/api/profile')
        //console.log( data )
        
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

     } catch (ex) { 
        console.log(ex.response.data);
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: ex.response.data
        })     
    }
}

//take in entire user object
export const updateUserProfile = (user) => async(dispatch) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })
     
        //headers.common: use to set token by default in all kinds of http request. 
         axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") //this line: from Mosh
    
        const { data } = await axios.put('/api/profile', user)
        console.log( data )
        
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

     } catch (ex) { 
        console.log(ex.response.data);
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: ex.response.data
        })     
    }
}

export const getUsers = () => async(dispatch) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })
     
        //headers.common: use to set token by default in all kinds of http request. 
         axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") //this line: from Mosh
    
        const { data } = await axios.get('/api/profile/users')
        console.log(data)
        
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })

     } catch (ex) { 
        console.log(ex.response.data);
        dispatch({
            type: USER_LIST_FAIL,
            payload: ex.response.data
        })     
    }
}

//ERROR: UPDATE USER NOT WORKING PROPERY. continuous admin user info is provided in console.
//userEditScreen "not filled up with selected user info" for edit.
export const updateUser = (user) => async(dispatch) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })
     
        //headers.common: use to set token by default in all kinds of http request. 
         axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") //this line: from Mosh
         
         const { data } = await axios.put(`/api/profile/users/${user._id}`, user) //user._id because we passed in whole user object.
        console.log(data)
        dispatch({ type: USER_UPDATE_SUCCESS })

        //This is kinda tricky:
        //To pass the data of updated user into userDetails, we need to dispatch USER_DETAILS_SUCCESS.
        dispatch({ 
            type: USER_DETAILS_SUCCESS,
            payload: data 
        }) 

     } catch (ex) { 
        console.log(ex.response.data);
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: ex.response.data
        })     
    }
}


export const deleteUser = (id) => async(dispatch) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })
     
        //headers.common: use to set token by default in all kinds of http request. 
         axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token") //this line: from Mosh
         
         await axios.delete(`/api/profile/users/${id}`)
        
        dispatch({
            type: USER_DELETE_SUCCESS
        })

     } catch (ex) { 
        console.log(ex.response.data);
        dispatch({
            type: USER_DELETE_FAIL,
            payload: ex.response.data
        })     
    }
}


export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo")
    localStorage.removeItem("token")

    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: MY_ORDER_LIST_RESET })
    dispatch({ type: USER_LIST_RESET })
}

//NEED TO BE SURE: is this function right?
const setItemLocalStorage = (data, token) => {
    localStorage.setItem("userInfo", JSON.stringify(data))   
    localStorage.setItem("token", token)        
}


