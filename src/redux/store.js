import { configureStore } from "@reduxjs/toolkit";
import eventReducers from "./reducers/eventReducers";
import clientReducers from "./reducers/ClientReducers";
const store = configureStore({
  reducer: {
    client: clientReducers, 
    events: eventReducers
  },
});

export default store;
