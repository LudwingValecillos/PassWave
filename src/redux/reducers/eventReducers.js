import { createReducer } from "@reduxjs/toolkit";
import { loadEvents } from "../actions/eventsAction";

const initialState = {
  events: [
    {
      id: 0,
      name: "",
      description: "",
      date: "",
      ticketPrice: 0,
      place: {
        id: 0,
        name: "",
        ticketMaxCapacity: 0,
        standMaxCapacity: 0,
        description: "",
      },
      images: [""],
      stands: [
        {
          id: 0,
          locations: [0],
          size: "",
          price: 0,
        },
      ],
      tickets: [
        {
          id: 0,
          eventName: "",
          purchaseDate: "",
        },
      ],
      artists: [""],
      ticketsAvailable: 0,
    },
  ],
  status: "idle",
  error: null,
};

const eventReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadEvents.fulfilled, (state, action) => {
      state.events = action.payload; // Reemplazar los eventos anteriores
      state.status = "success";
    })
    .addCase(loadEvents.pending, (state) => {
      state.status = "loading";
    })
    .addCase(loadEvents.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
});

export default eventReducer;
