// try {
//     const response = await axios.get(
//       "http://localhost:8080/api/auth/current",
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     return response.data; // Devuelve los datos del cliente directamente
//   } catch (error) {
//     console.error("Error loading client:", error);
//     return rejectWithValue(
//       error.response ? error.response.data : "Unknown error"
//     ); // Devuelve un mensaje de error
//   }