import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action ) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload

            const existItem = state.cartItems.find(cartItem => cartItem._id === item._id)
            
            if(existItem) 
                return {
                    ...state,
                    /* cartItems: state.cartItems.map(x => x.product === 
                        existItem.product ? item : x ) */
                }
    
            return {
                ...state,
                cartItems: [...state.cartItems, item]
                }   
                
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(cartItem => cartItem._id !== action.payload)
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
               shippingAddress: action.payload //Wrong: i copied cartItems here, didn't change the name to shipping address.
            //so,after selecting shippingAdress, state crossed out selected cartItems, and updated
            //cartItems with shippingAddress.
            
            /* another thing is that, I got the error for a long time, just checked the console's error message
            But,didn't checked REDUX DEV TOOLS. After checking the dev tool, I immediately figured out where the problem lies. */
            }

            // WHEN TO RETURN ...state, and when we don't????? like, for product and user Reducer...we dont return state.
            
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
               paymentMethod: action.payload
            }

        default:
            return state

    }
}
