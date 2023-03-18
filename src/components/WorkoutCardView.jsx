import React from "react";
import { Card, Typography, Tag, message } from "antd";
import { GREEN_COLOR } from "../constants";
import WorkoutCardActions from "./WorkoutCardActions";
const { Paragraph } = Typography;

const WorkoutCardView = ({ workout = {} }) => {
  return (
    <>
      <Card
        title={workout.name}
        extra={<WorkoutCardActions workout={workout} />}
        hoverable
        className="antd-card-margin"
      >
        <div className="min-hight">
          {true && (
            <Tag color={GREEN_COLOR} className="margin-bottom">
              Workout Type - {`${workout.type}`}
            </Tag>
          )}

          {true && (
            <Tag color={GREEN_COLOR} className="margin-bottom">
              Workout Level - {`${workout.level}`}
            </Tag>
          )}
        </div>
        <Paragraph type="secondary" className="text-align-left">
          Created At - {`${workout.created_at}`}
        </Paragraph>
      </Card>
    </>
  );
};

export default WorkoutCardView;
