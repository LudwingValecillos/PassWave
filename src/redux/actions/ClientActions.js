import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Acción asincrónica para cargar el cliente
export const loadClient = createAsyncThunk(
  "loadClient",
  async (_, { rejectWithValue }) => {
const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        "https://passwave.onrender.com/api/auth/current",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      return response.data; // Devuelve los datos del cliente directamente
    } catch (error) {
      console.error("Error loading client:", error);
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      ); // Devuelve un mensaje de error
    }
  }
);

