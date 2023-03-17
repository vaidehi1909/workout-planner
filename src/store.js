import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { authApi } from "./services/auth";
import { workoutApi } from "./services/workout";
import auth from "./reducers/authSlice";
import workout from "./reducers/workoutSlice";

export const createStore = (options) =>
  configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [workoutApi.reducerPath]: workoutApi.reducer,
      auth,
      workout,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware, workoutApi.middleware),
    ...options,
  });

export const store = createStore();

export const useAppDispatch = () => useDispatch();
