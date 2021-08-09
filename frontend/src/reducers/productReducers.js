import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST,  PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DELETE_SUCCESS, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_TOP_REQUEST, PRODUCT_TOP_FAIL } from "../constants/productConstants"
import { PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_FAIL, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_RESET, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_RESET, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_RESET, PRODUCT_TOP_SUCCESS } from './../constants/productConstants';

export const productListReducer = (state = {products: []}, action) => {
    switch(action.type) {
        case PRODUCT_LIST_REQUEST: 
            return {
                products: [],
                loading: true,             
            }
               
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                page: action.payload.pageNumber,
                pages: action.payload.pages
            }
        
        case PRODUCT_LIST_FAIL:
            return {
                loading: true,
                error: action.payload        
            }
        
        default: return state           
    }
}

export const productDetailsReducer = (state = {product: { reviews: [] }}, action) => {
    switch(action.type) {
        case PRODUCT_DETAILS_REQUEST: 
            return {
                ...state,
                loading: true,             
            }
               
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload        
            }
        
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: true,
                error: action.payload        
            }

        default: return state           
    }
}

export const productCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case PRODUCT_CREATE_REQUEST: 
            return {
                loading: true             
            }
               
        case PRODUCT_CREATE_SUCCESS:
            return {
                loading: false,
                success: true, // I wrote: success: false, so couldn't go to the edit product page.
                product: action.payload        
            }
        
        case PRODUCT_CREATE_FAIL:
            return {
                loading: true,
                error: action.payload        
            }

        case PRODUCT_CREATE_RESET:
            return { }

        default: return state           
    }
}

export const productUpdateReducer = (state = { product: {}}, action) => {
    switch(action.type) {
        case PRODUCT_UPDATE_REQUEST: 
            return {
                loading: true             
            }
               
        case PRODUCT_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true, // I wrote: success: false, so my UPDATE button didn't work.
                product: action.payload        
            }
        
        case PRODUCT_UPDATE_FAIL:
            return {
                loading: true,
                error: action.payload        
            }

        case PRODUCT_UPDATE_RESET:
            return { product: {} }

        default: return state           
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case PRODUCT_DELETE_REQUEST: 
            return {
                loading: true,             
            }
               
        case PRODUCT_DELETE_SUCCESS:
            return {
                loading: false,
                success: true      
            }
        
        case PRODUCT_DELETE_FAIL:
            return {
                loading: true,
                error: action.payload        
            }

        default: return state    
            
    }
}

//My WRONG WRITING: (state = { review: [] }, action) //STATE INITIALIZATION problematic to me.
export const productReviewCreateReducer = (state = { }, action) => {
    switch(action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST: 
            return {
                loading: true,             
            }
               
        case PRODUCT_CREATE_REVIEW_SUCCESS: //WHAT TO RETURN FROM success case generally?
            return {
                loading: false,
                success: true      
            }
        
        case PRODUCT_CREATE_REVIEW_FAIL:
            return {
                loading: true,
                error: action.payload        
            }

        case PRODUCT_CREATE_REVIEW_RESET:
            return {}             //my wrong: { review: [] }

        default: return state    
            
    }
}

export const topRatedProductReducer = (state = { products: [] }, action) => {
    switch(action.type) {
        case PRODUCT_TOP_REQUEST: 
            return {
                loading: true,  
                products: []  
            }
               
        case PRODUCT_TOP_SUCCESS: 
            return {
                loading: false,
                products: action.payload     
            }
        
        case PRODUCT_TOP_FAIL:
            return {
                loading: true,
                error: action.payload        
            }

        default: return state    
            
    }
}