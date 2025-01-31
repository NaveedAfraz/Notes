import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createNote = createAsyncThunk(
  "user/createNote",
  async ({ content, title, id }, { rejectWithValue }) => {
    console.log("userData", content, id, title);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/userNotes/Notes`,
        {
          content,
          title,
          id,
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

export const getNotes = createAsyncThunk(
  "user/getNotes",
  async (id, { rejectWithValue }) => {
    console.log("userData", id);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/userNotes/FetchNotes/${id}`,
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

export const deleteNote = createAsyncThunk(
  "user/deleteNote",
  async (id, { rejectWithValue }) => {
    try {
      console.log(id);
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/userNotes/DeleteNote/${id}`,
        { withCredentials: true }
      );
      console.log(response);

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const EditNote = createAsyncThunk(
  "user/EditNote",
  async ({ id, content }, { rejectWithValue }) => {
    try {
      console.log(id, content);
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/userNotes/EditNote/${id}`,
        {
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
const initialState = {
  isLoading: false,
  notes: [],
  error: null,
  editNote: {},
  fetchLatestNote: false,
};

const userNotesSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setEditNote: (state, action) => {
      state.editNote = action.payload;
    },
    setNotes: (state, action) => {
      console.log(action);
      state.notes = action.payload;
    },
    setfetchLatestNote: (state, action) => {
      state.fetchLatestNote = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
        state.userInfo = null;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.notes = action.payload;
      })
      .addCase(createNote.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        console.log(action);
        state.notes = action.payload.notes;
        console.log(state.notes);
        state.error = null;
        state.isLoading = false;
      })
      .addCase(getNotes.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(EditNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(EditNote.fulfilled, (state, action) => {
        console.log(action);
        state.notes = action.payload.notes;
        console.log(state.notes);
        state.error = null;
        state.isLoading = false;
      })
      .addCase(EditNote.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        console.log(action);
        state.notes = action.payload;
        console.log(state.notes);
        state.error = null;
        state.isLoading = false;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setEditNote, setNotes, setfetchLatestNote } =
  userNotesSlice.actions;
export default userNotesSlice.reducer;
