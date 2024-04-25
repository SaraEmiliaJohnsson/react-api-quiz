import { combineReducers } from "redux";
import { reducer as categoryReducer } from "./category.ts";



const rootReducer = combineReducers({
    category: categoryReducer
});



export default rootReducer;