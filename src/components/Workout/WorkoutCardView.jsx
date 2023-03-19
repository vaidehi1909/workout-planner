import React from "react";
import { Card, Typography, Tag, message } from "antd";
import { GREEN_COLOR } from "../../constants";
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
          {workout?.type && (
            <Tag color={GREEN_COLOR} className="margin-bottom">
              Type - {workout.type}
            </Tag>
          )}

          {workout?.level && (
            <Tag color={GREEN_COLOR} className="margin-bottom">
              Level - {workout.level}
            </Tag>
          )}

          {workout?.description && (
            <Paragraph
              ellipsis={{
                rows: 2,
              }}
              type="secondary"
              className="text-align-left"
            >
              {workout?.description}
            </Paragraph>
          )}
        </div>
      </Card>
    </>
  );
};

export default WorkoutCardView;
