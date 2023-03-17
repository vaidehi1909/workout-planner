import { createSlice } from "@reduxjs/toolkit";
import { workoutApi } from "../services/workout";

const slice = createSlice({
  name: "workout",
  initialState: { list: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      workoutApi.endpoints.fetchWorkouts.matchFulfilled,
      (state, { payload }) => {
        state.list = payload;
      }
    );
  },
});

export default slice.reducer;
