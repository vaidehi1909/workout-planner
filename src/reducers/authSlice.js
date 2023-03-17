import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/auth";

const slice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setSession: (state, { payload }) => {
      state.token = payload?.access_token;
      state.user = payload?.user;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.session.access_token;
          state.user = payload.session.user;
        }
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.token = null;
        state.user = null;
      });
  },
});

export default slice.reducer;

export const selectCurrentUser = (state) => state.auth.user;

export const { setSession } = slice.actions;
