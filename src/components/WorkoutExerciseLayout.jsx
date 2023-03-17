import { Row, Col } from "antd";
import React from "react";
import WorkoutDes from "./WorkoutDes";
import ExerciseView from "./ExerciseView";
const WorkoutExerciseLayout = () => {
  return (
    <>
      <Row>
        <Col span={16} offset={4}>
          <WorkoutDes />
        </Col>
      </Row>
      <Row>
        <Col span={16} offset={4}>
          <ExerciseView />
        </Col>
      </Row>
    </>
  );
};

export default WorkoutExerciseLayout;
