import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistMiddleware } from "./middleware/persist-middleware";
import reducers from "./reducers";

const store = createStore(
  reducers,
  {},
  applyMiddleware(persistMiddleware, thunk)
);

export default store;
