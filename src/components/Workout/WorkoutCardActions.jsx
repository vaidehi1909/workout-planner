import React from "react";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Divider, Popconfirm } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useDeleteWorkoutMutation } from "../../services/workout";
import { getRouteType, isPublicRoute } from "../../helper/locationHelper";

const WorkoutCardActions = ({ workout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [deleteWorkout, { isLoading: isDeleting }] = useDeleteWorkoutMutation();

  const handleGoAddExercise = () => {
    navigate(`/${getRouteType(location)}/${workout.id}`);
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
      {isPublicRoute(location) ? (
        <InfoCircleOutlined
          onClick={() => {
            handleGoAddExercise();
          }}
        />
      ) : (
        <>
          <EditOutlined
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
      )}
    </>
  );
};

export default WorkoutCardActions;
