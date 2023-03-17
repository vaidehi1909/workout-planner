import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../supabaseClient";

export const workoutApi = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    createWorkout: builder.mutation({
      queryFn: async (payload) => {
        const { error } = await supabase.from("workouts").insert(payload);
        return { error };
      },
    }),
    updateWorkout: builder.mutation({
      queryFn: async ({ email, password, name }) => {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
            },
          },
        });

        return { data, error };
      },
    }),
    deleteWorkout: builder.mutation({
      queryFn: async ({ email, password, name }) => {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
            },
          },
        });

        return { data, error };
      },
    }),
    fetchWorkouts: builder.query({
      queryFn: async (profile_id) => {
        const { data, error } = await supabase
          .from("workouts")
          .select("id, name, type, level, created_at")
          .eq("profile_id", profile_id);
        return { data, error };
      },
    }),
  }),
});

export const {
  useCreateWorkoutMutation,
  useUpdateWorkoutMutation,
  useDeleteWorkoutMutation,
  useFetchWorkoutsQuery,
} = workoutApi;
