import React, { useState } from "react";
import { Card, Typography, Tag, message } from "antd";
import { GREEN_COLOR } from "../../constants";
import { EditOutlined } from "@ant-design/icons";
import WorkoutModal from "../WorkoutModal";
const { Paragraph } = Typography;

const WorkoutBasicDetails = ({ workout }) => {
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);

  const onClose = () => {
    setShowWorkoutModal(false);
  };
  return (
    <>
      <Card
        title="Workout Details"
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
              Workout Type - {workout.type}
            </Tag>
          )}

          {true && (
            <Tag color={GREEN_COLOR} className="margin-bottom">
              Workout Level - {workout.level}
            </Tag>
          )}
        </div>
        <Paragraph type="secondary" className="text-align-left">
          Created At - {workout.created_at}
        </Paragraph>
      </Card>
      <WorkoutModal
        visible={showWorkoutModal}
        onClose={onClose}
        mode={"edit"}
        workout={workout}
      />
    </>
  );
};

export default WorkoutBasicDetails;
