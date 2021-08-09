import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import jwtDecode from "jwt-decode"
import { composeWithDevTools } from "redux-devtools-extension"
import { productListReducer, productDetailsReducer, productCreateReducer, productUpdateReducer, productDeleteReducer, productReviewCreateReducer, topRatedProductReducer} from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"
import { userLoginReducer, userRegisterReducer, userDetailsReducer, 
        userUpdateProfileReducer, userListReducer, userUpdateReducer, userDeleteReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderDeliverReducer, myOrderListReducer, OrderListReducer } from './reducers/orderReducers'

const reducer = combineReducers({
    productList: productListReducer, 
    productDetails: productDetailsReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    productReviewCreate: productReviewCreateReducer, //my own writing: productReview: productCreateReviewReducer
    topRatedProducts: topRatedProductReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    myOrderList: myOrderListReducer,
    orderList: OrderListReducer
})

const cartItemsFromStorage = localStorage.getItem("cartItems") 
                    ? JSON.parse(localStorage.getItem("cartItems")) : []

const userInfoFromStorage = localStorage.getItem("userInfo") 
                    ? JSON.parse(localStorage.getItem("userInfo")) : null

const shippingAddressFromStorage = localStorage.getItem("shippingAddress") 
                    ? JSON.parse(localStorage.getItem("shippingAddress")) : {} //when to use {} or null..not clear.


//How this initial state differs from reducers initial state????????? 
//WHY THIS initial state is needed?????
const initialState = { 
    cart: { 
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage 
    },
    userLogin: { userInfo: userInfoFromStorage },
}  //what's the functionallity of initial state?? so, why do we use reducer

const middleware = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))


export default store