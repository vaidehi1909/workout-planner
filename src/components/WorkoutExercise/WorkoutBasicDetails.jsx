import React, { useState } from "react";
import { Card, Typography, Tag, message, Row, Col } from "antd";
import { GREEN_COLOR } from "../../constants";

import WorkoutModal from "../Workout/WorkoutModal";
import WorkoutBasicDetailsActions from "./WorkoutBasicDetailsActions";
const { Paragraph, Text } = Typography;

const WorkoutBasicDetails = ({ workout }) => {
  return (
    <>
      <Card
        title="Workout Details"
        extra={<WorkoutBasicDetailsActions workout={workout} />}
        hoverable
        className="antd-card-margin min-hight"
      >
        {workout?.name && <h1>{workout?.name}</h1>}

        {workout.type && (
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
          <Paragraph type="secondary">{workout.description}</Paragraph>
        )}
      </Card>
    </>
  );
};

export default WorkoutBasicDetails;
