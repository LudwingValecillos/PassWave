import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./reducers/ClientReducers";
import eventReducer from "./reducers/eventReducers";
const store = configureStore({
  reducer: {
    client: clientReducer, // Asegúrate de registrar el clientReducer
    events: eventReducer
  },
});

export default store;
