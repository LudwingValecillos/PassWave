import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./reducers/clientReducers";
import eventReducer from "./reducers/eventReducers";
const store = configureStore({
  reducer: {
    client: clientReducer, 
    events: eventReducer
  },
});

export default store;
