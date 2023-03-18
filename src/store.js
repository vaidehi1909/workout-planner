import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth";
import { workoutApi } from "./services/workout";
import { exerciseApi } from "./services/exercise";
import auth from "./reducers/authSlice";
import workout from "./reducers/workoutSlice";
import exercise from "./reducers/exerciseSlice";

export const createStore = (options) =>
  configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [workoutApi.reducerPath]: workoutApi.reducer,
      [exerciseApi.reducerPath]: exerciseApi.reducer,
      auth,
      workout,
      exercise,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        workoutApi.middleware,
        exerciseApi.middleware
      ),
    ...options,
  });

export const store = createStore();
