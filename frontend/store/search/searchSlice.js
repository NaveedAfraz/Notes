import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const search = createAsyncThunk(
  "note/search",
  async ({ searchBy, userId, content }, { rejectWithValue }) => {
    console.log(searchBy, userId, content);
    try {
      const response = await axios.post(
        `http://localhost:3006/notesearch/search`,
        {
          searchBy,
          userId,
          content,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchTerm: "",
    notes: [],
    error: null,
    isOverlayVisible: false,
  },
  reducers: {
    setOverlayVisible: (state, action) => {
      state.isOverlayVisible = action.payload;
    },
    setError: (state, action) => {
      console.log(action.payload);

      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(search.fulfilled, (state, action) => {
        console.log("fulfilled");
        console.log(action);
        state.notes = action.payload;
      })
      .addCase(search.rejected, (state, action) => {
        console.log(action.payload);

        console.log("rejected");
        state.error = action.payload.message;
      });
  },
});

export const { setOverlayVisible, setError } = searchSlice.actions;
export default searchSlice.reducer;
