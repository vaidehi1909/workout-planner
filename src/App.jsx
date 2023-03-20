import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "antd/dist/reset.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
// import Dashboard from "./components/Dashboard";
// import WorkoutLayout from "./components/Workout/WorkoutLayout";
// import PrivateOutlet from "./PrivateOutlet";
// import WorkoutExerciseLayout from "./components/WorkoutExercise/WorkoutExerciseLayout";
import { supabase } from "./supabaseClient";
import { setSession } from "./reducers/authSlice";
import "./App.css";

const SignupForm = React.lazy(() => import("./components/SignupForm"));
const PrivateOutlet = React.lazy(() => import("./PrivateOutlet"));
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const WorkoutLayout = React.lazy(() =>
  import("./components/Workout/WorkoutLayout")
);
const WorkoutExerciseLayout = React.lazy(() =>
  import("./components/WorkoutExercise/WorkoutExerciseLayout")
);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setSession(session));
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        dispatch(setSession(session));
      }
    );

    return () => {
      if (authListener) authListener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return (
    <BrowserRouter>
      <React.Suspense fallback={<>...</>}>
        <Routes>
          <Route index element={<LoginForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="*" element={<PrivateOutlet />}>
            <Route path="my-workouts" element={<Dashboard />}>
              <Route index element={<WorkoutLayout />} />
              <Route path=":id" element={<WorkoutExerciseLayout />} />
            </Route>
            <Route path="public-workouts" element={<Dashboard />}>
              <Route index element={<WorkoutLayout />} />
              <Route path=":id" element={<WorkoutExerciseLayout />} />
            </Route>
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
