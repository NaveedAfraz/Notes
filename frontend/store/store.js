import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/auth/auth.slice";
import userNotesReducer from "../store/userNotes/userNotes";
import searchReducer from "../store/search/searchSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    userNotes: userNotesReducer,
    search: searchReducer,
  },
});

export default store;
