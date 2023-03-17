import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../supabaseClient";

export const authApi = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation({
      queryFn: async (credentials) => {
        // const {data, error} = await supabase
        //   .from('todo')
        //   .select('id, name')
        //   .eq('done', false)

        const { data, error } = await supabase.auth.signInWithPassword(
          credentials
        );

        return { data, error };
      },
    }),
    signup: builder.mutation({
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
    logout: builder.mutation({
      queryFn: async () => {
        const { error } = await supabase.auth.signOut();
        return { error };
      },
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation } =
  authApi;
