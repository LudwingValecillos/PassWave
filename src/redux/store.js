import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./reducers/ClientReducers";
import eventReducer from "./reducers/eventReducers";
const store = configureStore({
  reducer: {
    client: clientReducer, 
    events: eventReducer
  },
});

export default store;
