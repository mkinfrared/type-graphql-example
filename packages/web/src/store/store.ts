import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import reducers from "store/reducers";

const store = createStore(reducers, composeWithDevTools(applyMiddleware()));

export default store;
