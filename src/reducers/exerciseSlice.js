import { createSlice } from "@reduxjs/toolkit";
import { exerciseApi } from "../services/exercise";

const slice = createSlice({
  name: "exercises",
  initialState: { list: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      exerciseApi.endpoints.fetchWorkoutExercises.matchFulfilled,
      (state, { payload }) => {
        state.list = payload;
      }
    );
  },
});

export default slice.reducer;
