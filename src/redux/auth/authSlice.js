import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { register, login, logout, refresh, updatePhoto } from "./operations";

const initialState = {
  user: {
    email: null,
    username: null,
    userId: null,
    photo: null,
  },
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
        state.user = initialState.user;
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(refresh.fulfilled, (state, { payload }) => {
        state.isLoggedIn = !!payload;
        state.user = payload
          ? { ...state.user, ...payload }
          : initialState.user;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updatePhoto.fulfilled, (state, { payload }) => {
        state.user = { ...state.user, ...payload };
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(
        isAnyOf(register.fulfilled, login.fulfilled),
        (state, { payload }) => {
          state.user = { ...state.user, ...payload };
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
          refresh.rejected,
          updatePhoto.rejected
        ),
        (state, { payload }) => {
          state.user = initialState.user;
          state.isLoading = false;
          state.error = payload;
        }
      )
      .addMatcher(
        isAnyOf(
          register.pending,
          login.pending,
          logout.pending,
          refresh.pending,
          updatePhoto.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      );
  },
});

export const authReducer = authSlice.reducer;
