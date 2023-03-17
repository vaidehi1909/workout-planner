import React, { useState } from "react";
import {
  DeleteOutlined,
  PlusSquareOutlined,
  EditOutlined,
} from "@ant-design/icons";
import WorkoutModal from "./WorkoutModal";
import { Divider, message, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";

const WorkoutCardActions = () => {
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const navigate = useNavigate();

  const handleGoAddExercise = () => {
    navigate("/dashboard/addexercise");
  };
  const onSubmit = () => {
    setShowWorkoutModal(false);
  };
  const onCancel = () => {
    setShowWorkoutModal(false);
  };
  return (
    <>
      <PlusSquareOutlined
        onClick={() => {
          handleGoAddExercise();
        }}
      />
      <Divider type="vertical" />
      <EditOutlined onClick={() => setShowWorkoutModal(true)} />
      <Divider type="vertical" />
      <Popconfirm
        title="Delete"
        description="Are you sure to delete this Workout?"
        okText="Yes"
        cancelText="No"
        // onConfirm={onDelete}
      >
        <DeleteOutlined />
      </Popconfirm>
      <WorkoutModal
        showWorkoutModal={showWorkoutModal}
        onSubmit={onSubmit}
        onCancel={onCancel}
        mode={"edit"}
      />
    </>
  );
};

export default WorkoutCardActions;
