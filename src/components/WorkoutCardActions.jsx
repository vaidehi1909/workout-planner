import React from "react";
import { DeleteOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Divider, message, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import { useDeleteWorkoutMutation } from "../services/workout";

const WorkoutCardActions = ({ workout }) => {
  const navigate = useNavigate();
  const [deleteWorkout, { isLoading: isDeleting }] = useDeleteWorkoutMutation();

  const handleGoAddExercise = () => {
    navigate(`/workouts/${workout.id}`);
  };

  const onDelete = () => {
    deleteWorkout(workout.id)
      .then(() => {
        console.log("deleted");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <PlusSquareOutlined
        onClick={() => {
          handleGoAddExercise();
        }}
      />
      <Divider type="vertical" />
      <Popconfirm
        title="Delete"
        description="Are you sure you want to delete this Workout?"
        okText="Yes"
        cancelText="No"
        okButtonProps={{ loading: isDeleting }}
        onConfirm={onDelete}
      >
        <DeleteOutlined />
      </Popconfirm>
    </>
  );
};

export default WorkoutCardActions;
