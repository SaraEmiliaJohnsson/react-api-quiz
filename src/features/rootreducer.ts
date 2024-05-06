import { combineReducers } from "redux";
import { categoryReducer } from "./category.ts";



const rootReducer = combineReducers({
    category: categoryReducer
});



export default rootReducer;