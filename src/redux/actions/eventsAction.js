// actions/eventsAction.js
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Acción para seleccionar un evento
export const selectEvent = createAction("selectEvent");

// Acción asincrónica para cargar los eventos
export const loadEvents = createAsyncThunk(
  "loadEvents",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("https://passwave.onrender.com/api/event/all");
      return response.data; // Devuelve los datos del cliente directamente
    } catch (error) {
      console.error("Error loading events:", error);
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      ); // Devuelve un mensaje de error
    }
  }
);
