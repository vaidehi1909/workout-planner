import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../supabaseClient";

export const workoutApi = createApi({
  reducerPath: "workoutApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Workouts"],
  endpoints: (builder) => ({
    createWorkout: builder.mutation({
      queryFn: async (payload) => {
        const { error } = await supabase.from("workouts").insert(payload);
        return { error };
      },
      invalidatesTags: ["Workouts"],
    }),
    updateWorkout: builder.mutation({
      queryFn: async ({ id, payload }) => {
        const { data, error } = await supabase
          .from("workouts")
          .update(payload)
          .eq("id", id);

        return { data, error };
      },
      invalidatesTags: ["Workouts"],
    }),
    deleteWorkout: builder.mutation({
      queryFn: async (id) => {
        const { data, error } = await supabase
          .from("workouts")
          .delete()
          .eq("id", id);

        return { data, error };
      },
      invalidatesTags: ["Workouts"],
    }),
    duplicateWorkout: builder.mutation({
      queryFn: async (payload) => {
        const { id, ...workout } = payload;
        const { data: newWorkout, error: workoutError } = await supabase
          .from("workouts")
          .insert(workout)
          .select("id");
        if (workoutError) {
          return { error: workoutError };
        }
        const { data: workout_exercises } = await supabase
          .from("workout_exercises")
          .select("name, description, sets, reps")
          .eq("workout_id", id);
        const newWorkoutExercises = workout_exercises.map((exercise) => {
          return { ...exercise, workout_id: newWorkout[0].id };
        });
        const { data, error } = await supabase
          .from("workout_exercises")
          .insert(newWorkoutExercises);
        return { data, error };
      },
      invalidatesTags: ["Workouts"],
    }),
    fetchWorkouts: builder.query({
      queryFn: async (condition) => {
        const filter = condition.split(" ");
        const { data, error } = await supabase
          .from("workouts")
          .select("id, name, type, level, description ,created_at")
          .filter(...filter);
        return { data, error };
      },
      providesTags: (result) =>
        (result || []).length > 0
          ? result.map(({ id }) => ({ type: "Workouts", id }))
          : ["Workouts"],
    }),
    fetchWorkoutById: builder.query({
      queryFn: async (id) => {
        const { data, error } = await supabase
          .from("workouts")
          .select("id, name, type, level, description, profile_id, created_at")
          .eq("id", id);
        return { data, error };
      },
      providesTags: (result) =>
        (result || []).length > 0
          ? result.map(({ id }) => ({ type: "Workouts", id }))
          : ["Workouts"],
    }),
  }),
});

export const {
  useCreateWorkoutMutation,
  useUpdateWorkoutMutation,
  useDeleteWorkoutMutation,
  useDuplicateWorkoutMutation,
  useFetchWorkoutsQuery,
  useFetchWorkoutByIdQuery,
} = workoutApi;
