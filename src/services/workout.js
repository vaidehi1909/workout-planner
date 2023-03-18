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
      queryFn: async (id, payload) => {
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
    fetchWorkouts: builder.query({
      queryFn: async (profile_id) => {
        const { data, error } = await supabase
          .from("workouts")
          .select("id, name, type, level, created_at")
          .eq("profile_id", profile_id);
        return { data, error };
      },
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Workouts", id }))
          : ["Workouts"],
    }),
    fetchWorkoutById: builder.query({
      queryFn: async (id) => {
        const { data, error } = await supabase
          .from("workouts")
          .select("id, name, type, level, profile_id, is_public, created_at")
          .eq("id", id);
        return { data, error };
      },
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Workouts", id }))
          : ["Workouts"],
    }),
  }),
});

export const {
  useCreateWorkoutMutation,
  useUpdateWorkoutMutation,
  useDeleteWorkoutMutation,
  useFetchWorkoutsQuery,
  useFetchWorkoutByIdQuery,
} = workoutApi;
