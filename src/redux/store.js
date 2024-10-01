import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./reducers/ClientReducers";
const store = configureStore({
  reducer: {
    client: clientReducer, // Asegúrate de registrar el clientReducer
  },
});

export default store;
