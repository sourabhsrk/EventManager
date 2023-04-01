import { combineReducers } from "redux";
import progressReducer from "./progressReducer";

const reducers = combineReducers({
    progress : progressReducer
})

export default reducers