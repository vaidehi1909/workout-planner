import React from "react";
import { Row, Col, Spin, Empty } from "antd";

import WorkoutCardView from "./WorkoutCardView";

import { useFetchWorkoutsQuery } from "../../services/workout";
import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";
import { isPublicRoute } from "../../helper/locationHelper";
import ListHeader from "./ListHeader";

const getConditions = (profile_id, location) => {
  let condition = `profile_id eq ${profile_id}`;
  if (isPublicRoute(location)) {
    condition = `profile_id neq ${profile_id}`;
  }
  return condition;
};

const WorkoutLayout = () => {
  const auth = useAuth();
  const location = useLocation();

  const {
    data: workouts,
    isLoading,
    isFetching,
  } = useFetchWorkoutsQuery(getConditions(auth.user.id, location));

  if (isLoading || isFetching) {
    return (
      <Spin style={{ marginTop: "150px" }} tip="Loading" size="large">
        <div className="content" />
      </Spin>
    );
  }

  const renderWorkoutGrid = () => {
    if ((workouts || []).length === 0) {
      return <Empty />;
    }
    return (
      <Row>
        {(workouts || []).map((workout) => {
          return (
            <Col
              key={workout.id}
              lg={6}
              md={8}
              sm={12}
              xs={24}
              xl={6}
              className="margin-5px"
            >
              <WorkoutCardView workout={workout} />
            </Col>
          );
        })}
      </Row>
    );
  };

  return (
    <>
      <ListHeader />
      {renderWorkoutGrid()}
    </>
  );
};

export default WorkoutLayout;
