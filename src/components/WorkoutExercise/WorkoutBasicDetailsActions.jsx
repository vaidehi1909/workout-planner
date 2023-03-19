import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import WorkoutModal from "../Workout/WorkoutModal";
import { useLocation } from "react-router-dom";
import { isPublicRoute } from "../../helper/locationHelper";
import { Button, message } from "antd";
import { useDuplicateWorkoutMutation } from "../../services/workout";
import { useAuth } from "../../hooks/useAuth";

const WorkoutBasicDetailsActions = ({ workout }) => {
  const auth = useAuth();
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [duplicateWorkout, { isLoading }] = useDuplicateWorkoutMutation();
  const location = useLocation();
  const onClose = () => {
    setShowWorkoutModal(false);
  };
  const onDuplicate = () => {
    duplicateWorkout({ ...workout, profile_id: auth.user.id })
      .then(() => {
        message.success("Successfully added to my workwout");
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      {isPublicRoute(location) ? (
        <Button onClick={onDuplicate} loading={isLoading}>
          Add To My Workout
        </Button>
      ) : (
        <>
          <EditOutlined
            onClick={() => {
              setShowWorkoutModal(true);
            }}
          />
          <WorkoutModal
            visible={showWorkoutModal}
            onClose={onClose}
            mode={"edit"}
            workout={workout}
          />
        </>
      )}
    </>
  );
};

export default WorkoutBasicDetailsActions;
