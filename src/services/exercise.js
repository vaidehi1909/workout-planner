import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../supabaseClient";

export const exerciseApi = createApi({
  reducerPath: "exerciseApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Workout_Exercises", "Exercises"],
  endpoints: (builder) => ({
    createWorkoutExercise: builder.mutation({
      queryFn: async (payload) => {
        const { error } = await supabase
          .from("workout_exercises")
          .insert(payload);
        return { error };
      },
      invalidatesTags: ["Workout_Exercises"],
    }),
    updateWorkoutExercise: builder.mutation({
      queryFn: async (id, payload) => {
        const { data, error } = await supabase
          .from("workout_exercises")
          .update(payload)
          .eq("id", id);

        return { data, error };
      },
      invalidatesTags: ["Workout_Exercises"],
    }),
    deleteWorkoutExercise: builder.mutation({
      queryFn: async (id) => {
        const { data, error } = await supabase
          .from("workout_exercises")
          .delete()
          .eq("id", id);

        return { data, error };
      },
      invalidatesTags: ["Workout_Exercises"],
    }),
    fetchWorkoutExercises: builder.query({
      queryFn: async (workout_id) => {
        const { data, error } = await supabase
          .from("workout_exercises")
          .select("id, name, description, sets, reps, created_at")
          .eq("workout_id", workout_id);
        return { data, error };
      },
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Workout_Exercises", id }))
          : ["Workout_Exercises"],
    }),
    fetchExercises: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase
          .from("exercises")
          .select("id, name, description, created_at");
        return { data, error };
      },
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Exercises", id }))
          : ["Exercises"],
    }),
  }),
});

export const {
  useCreateWorkoutExerciseMutation,
  useUpdateWorkoutExerciseMutation,
  useDeleteWorkoutExerciseMutation,
  useFetchWorkoutExercisesQuery,
  useFetchExercisesQuery,
} = exerciseApi;
