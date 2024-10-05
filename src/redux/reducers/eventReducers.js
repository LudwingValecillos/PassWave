// reducers/eventReducer.js
import { createReducer } from "@reduxjs/toolkit";
import { loadEvents, selectEvent } from "../actions/eventsAction";

const initialState = {
  events: [], // Cambié a un array vacío para empezar
  selectedEvent: null, // Estado para el evento seleccionado
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
    })
    .addCase(selectEvent, (state, action) => {
      state.selectedEvent = action.payload; // Almacena el evento seleccionado
    });
});

export default eventReducer;
