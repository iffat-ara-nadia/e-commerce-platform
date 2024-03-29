import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_UPDATE_PROFILE_SUCCESS, USER_LIST_REQUEST, USER_LIST_FAIL, USER_LIST_RESET, USER_DELETE_REQUEST, USER_DELETE_FAIL, USER_UPDATE_SUCCESS, USER_UPDATE_RESET } from '../constants/userConstants';
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from '../constants/userConstants';
import { USER_DETAILS_REQUEST, USER_DETAILS_FAIL, USER_DETAILS_SUCCESS, USER_LIST_SUCCESS} from '../constants/userConstants';
import { USER_DELETE_SUCCESS, USER_DETAILS_RESET, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_FAIL,} from '../constants/userConstants';
import { USER_UPDATE_REQUEST, USER_UPDATE_FAIL } from './../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST: 
            return {
                loading: true,             
            }       

        /* case SET_USER: 
           return{
               ...state,
               user: action.payload
           } */
           
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload       
            }
        case  USER_LOGIN_FAIL:
            return {
                loading: true,
                error: action.payload        
            }
        case  USER_LOGOUT:
            return { }
        
        default: return state              
    }
}
export const userRegisterReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST: 
            return {
                loading: true,             
            }       
        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload        
            }
        case USER_REGISTER_FAIL:
            return {
                loading: true,
                error: action.payload        
            }

        case  USER_LOGOUT:
            return { }
 
        default: return state            
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch(action.type) {
        case USER_DETAILS_REQUEST: 
            return {
                loading: true, 
                ...state            
            }       
        case USER_DETAILS_SUCCESS:
            return {
                loading: false,
                user: action.payload        
            }
        case USER_DETAILS_FAIL:
            return {
                loading: true,
                error: action.payload        
            }
        case USER_DETAILS_RESET:
            return { user: {} }
 
        default: 
            return state            
    }
}

export const userUpdateProfileReducer = (state = { }, action) => { //why empty state to begin with?
    switch(action.type) {
        case USER_UPDATE_PROFILE_REQUEST: 
            return {
                loading: true,      
            }       
        case USER_UPDATE_PROFILE_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
                success: true       
            }
        case USER_UPDATE_PROFILE_FAIL:
            return {
                loading: true,
                error: action.payload        
            }

        default: 
            return state            
    }
}


export const userListReducer = (state = { users: [] }, action) => { 
    switch(action.type) {
        case USER_LIST_REQUEST: 
            return {
                ...state, /// after returning the initial state(by myself, didn't see in the course), Users table showed up. After a long,long time.
                loading: true,      
            }       
        case USER_LIST_SUCCESS:
            return {
                loading: false,
                users: action.payload,        
            }   
        case USER_LIST_FAIL:
            return {
                loading: true,
                error: action.payload        
            }
        case USER_LIST_RESET:
            return {
                users: []
            }
        default: 
            return state            
    }
}

export const userUpdateReducer = (state = { user: {} }, action) => { 
    switch(action.type) {
        case USER_UPDATE_REQUEST: 
            return {
                loading: true,      
            }       
        case USER_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true      
            }   
        case USER_UPDATE_FAIL:
            return {
                loading: true,
                error: action.payload        
            }
        case USER_UPDATE_RESET:
            return {
                user: {}   
            }
        default: 
            return state            
    }
}



export const userDeleteReducer = (state = {  }, action) => { 
    switch(action.type) {
        case USER_DELETE_REQUEST: 
            return {
                loading: true,      
            }       
        case USER_DELETE_SUCCESS:
            return {
                loading: false,
                success: true      
            }   
        case USER_DELETE_FAIL:
            return {
                loading: true,
                error: action.payload        
            }
        default: 
            return state            
    }
}
