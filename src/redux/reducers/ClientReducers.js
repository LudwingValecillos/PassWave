import { createReducer } from "@reduxjs/toolkit";
import { loadClient } from "../actions/ClientActions";


const initialState = {
  client: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    orderTickets:[
        {
            id: 0,
            purchaseDate: "",
            quantity: 0,
            hashCode: "",
            event: "",
            eventId: 0
        },
    ],
    rents: [
        {
            id: 0,
            name: "",
            description: "",
            hashCode: "",
            rentedPositions: [
                0,
            ],
            renDate: ""
        },
    ],
    cards: [
      {
        id: 0,
        cvv: 0,
        number: 0,
        thruDate: "",
        type: "",
        networkType: "",
        clientHolder: "",
      },
    ],
  },
  status: "idle",
  error: null,
};

const clientReducer = createReducer(initialState, (builder) => {
  builder
    // Manejo de loadClient
    .addCase(loadClient.fulfilled, (state, action) => {
      state.client = action.payload;
      state.status = "success";
    })
    .addCase(loadClient.pending, (state) => {
      state.status = "loading";
    })
    .addCase(loadClient.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    })

});

export default clientReducer;

