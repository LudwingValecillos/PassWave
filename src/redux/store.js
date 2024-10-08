import { configureStore } from "@reduxjs/toolkit";
import eventReducers from "./reducers/eventReducers";
import clientReducer from "./reducers/clientReducers";
const store = configureStore({
  reducer: {
    client: clientReducer, 
    events: eventReducers
  },
});

export default store;
