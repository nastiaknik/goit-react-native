import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { register, login, logout, refresh } from "./operations";

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(refresh.fulfilled, (state, { payload }) => {
        // if (payload) {
        //   state.isLoggedIn = true;
        // } else {
        //   state.isLoggedIn = false;
        // }
        state.isLoggedIn = !!payload;
        state.user = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(
        isAnyOf(register.fulfilled, login.fulfilled),
        (state, { payload }) => {
          state.user = payload.user;
          state.isLoggedIn = true;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          register.rejected,
          login.rejected,
          logout.rejected,
          refresh.rejected
        ),
        (state, { payload }) => {
          state.user = null;
          state.isLoading = false;
          state.error = payload;
        }
      )
      .addMatcher(
        isAnyOf(
          register.pending,
          login.pending,
          logout.pending,
          refresh.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      );
  },
});

export const authReducer = authSlice.reducer;
