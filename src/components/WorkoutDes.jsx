import React, { useState } from "react";
import { Card, Typography, Tag, message } from "antd";
import { GREEN_COLOR } from "../constants";
import { EditOutlined } from "@ant-design/icons";
import WorkoutModal from "./WorkoutModal";
const { Paragraph } = Typography;

const WorkoutDes = () => {
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const onSubmit = () => {
    setShowWorkoutModal(false);
  };
  const onCancel = () => {
    setShowWorkoutModal(false);
  };
  return (
    <>
      <Card
        title="Workout Title"
        extra={
          <EditOutlined
            onClick={() => {
              setShowWorkoutModal(true);
            }}
          />
        }
        hoverable
        className="antd-card-margin"
      >
        <div className="min-hight">
          {true && (
            <Tag color={GREEN_COLOR} className="margin-bottom">
              Workout Type - Leges
            </Tag>
          )}

          {true && (
            <Tag color={GREEN_COLOR} className="margin-bottom">
              Workout Level - Reguler
            </Tag>
          )}
        </div>
        <Paragraph type="secondary" className="text-align-left">
          Created At
        </Paragraph>
      </Card>
      <WorkoutModal
        showWorkoutModal={showWorkoutModal}
        onSubmit={onSubmit}
        onCancel={onCancel}
        mode={"edit"}
      />
    </>
  );
};

export default WorkoutDes;
