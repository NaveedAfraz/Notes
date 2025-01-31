import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const CreateUser = createAsyncThunk(
  "user/createUser",
  async (userData, { rejectWithValue }) => {
    console.log("userData", userData);
    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/auth/register`,
        {
          userData,
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

export const AuthUser = createAsyncThunk(
  "user/authUser",
  async (userData, { rejectWithValue }) => {
    console.log("userData", userData);
    const email = userData.email;
    const password = userData.password;
    console.log("the backendurl is ", import.meta.env.VITE_BACKEND_URL);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/AuthUser`,
        {
          email,
          password,
        },
        {
          withCredentials: true, // Move this to the config object
          headers: {
            "Content-Type": "application/json",
          },
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

export const LogoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    console.log("running");
    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    console.log(email);

    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/auth/ForgotPassword`,
        {
          email,
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

export const ResetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ password, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/auth/resetPassword`,
        {
          password,
          token,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  isLoading: false,
  userInfo: null,
  error: null,
  userDetails: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload);
      state.userDetails = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CreateUser.pending, (state) => {
      state.isLoading = true;
      state.userInfo = null;
    });
    builder.addCase(CreateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userInfo = action.payload;
    });
    builder.addCase(CreateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Handle AuthUser
    builder.addCase(AuthUser.pending, (state) => {
      state.isLoading = true;
      state.userInfo = null;
    });
    builder.addCase(AuthUser.fulfilled, (state, action) => {
      console.log("action.payload", action.payload);
      state.isLoading = false;
      state.userInfo = action.payload;
    });
    builder.addCase(AuthUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder
      .addCase(LogoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LogoutUser.fulfilled, (state, action) => {
        console.log(action);

        state.isLoading = false;
        state.userInfo = null;
      })
      .addCase(LogoutUser.rejected, (state, action) => {
        state.isLoading = false;
      });

    builder
      .addCase(ResetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ResetPassword.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.userInfo = null;
      })
      .addCase(ResetPassword.rejected, (state, action) => {
        state.isLoading = false;
      });

    builder
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.userInfo = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
