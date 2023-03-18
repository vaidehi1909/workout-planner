import React from "react";
import { Row, Col, Spin, Empty } from "antd";
import WorkoutBasicDetails from "./WorkoutBasicDetails";
import WorkoutExerciseListView from "./WorkoutExerciseListView.jsx";
import { useParams } from "react-router-dom";
import { useFetchWorkoutByIdQuery } from "../../services/workout";

const colProps = {
  xl: { span: 16, offset: 4 },
  md: { span: 18, offset: 6 },
  xs: { span: 20, offset: 1 },
};
const WorkoutExerciseLayout = () => {
  const params = useParams();
  const { data: workouts, isLoading } = useFetchWorkoutByIdQuery(params.id);
  if (isLoading) {
    return (
      <Spin style={{ marginTop: "150px" }} tip="Loading" size="large">
        <div className="content" />
      </Spin>
    );
  }
  if (!workouts) {
    return <Empty />;
  }
  const workout = workouts[0];
  return (
    <>
      <Row>
        <Col {...colProps}>
          <WorkoutBasicDetails workout={workout} />
        </Col>
      </Row>
      <Row>
        <Col {...colProps}>
          <WorkoutExerciseListView workout={workout} />
        </Col>
      </Row>
    </>
  );
};

export default WorkoutExerciseLayout;
