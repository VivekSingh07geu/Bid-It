import {createStore , combineReducers , applyMiddleware} from "redux"
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"
import { newProductReducer, productDetailsReducer, productReducer } from "./reducers/productReducer";
import { allUsersReducer, userReducer } from "./reducers/userReducer";
import { allOrdersReducer, newOrderReducer, orderReducer } from "./reducers/orderReducer";


const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    newProduct: newProductReducer,
    order: orderReducer,
    newOrder: newOrderReducer,
    allOrders: allOrdersReducer,
    allUsers: allUsersReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer, 
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;  