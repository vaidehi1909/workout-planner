import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "antd/dist/reset.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import WorkoutLayout from "./components/WorkoutLayout";
import PrivateOutlet from "./PrivateOutlet";
import WorkoutExerciseLayout from "./components/WorkoutExercise/WorkoutExerciseLayout";
import { supabase } from "./supabaseClient";
import { setSession } from "./reducers/authSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setSession(session));
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`Supabase auth event: ${event}`, session);
        dispatch(setSession(session));
      }
    );

    return () => {
      if (authListener) authListener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginForm />} />
        <Route path="signup" element={<SignupForm />} />
        <Route path="*" element={<PrivateOutlet />}>
          <Route path="workouts" element={<Dashboard />}>
            <Route index element={<WorkoutLayout />} />
            <Route path=":id" element={<WorkoutExerciseLayout />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
