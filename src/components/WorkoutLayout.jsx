import React, { useState } from "react";
import { Button, Row, Col, Spin, Empty } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import WorkoutCardView from "./WorkoutCardView";
import WorkoutModal from "./WorkoutModal";
import { useFetchWorkoutsQuery } from "../services/workout";
import { useAuth } from "../hooks/useAuth";

const WorkoutLayout = () => {
  const auth = useAuth();
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const { data: workouts, isLoading } = useFetchWorkoutsQuery(auth.user.id);

  const onModalClose = () => {
    setShowWorkoutModal(false);
  };
  if (isLoading) {
    return (
      <Spin style={{ marginTop: "150px" }} tip="Loading" size="large">
        <div className="content" />
      </Spin>
    );
  }

  return (
    <>
      <Row className="add-workout-btn margin-top-10px">
        <Col flex="auto"></Col>
        <Col flex="220px">
          <Button onClick={() => setShowWorkoutModal(true)}>
            Create Workout <PlusCircleOutlined />
          </Button>
        </Col>
      </Row>
      {showWorkoutModal && (
        <WorkoutModal
          visible={showWorkoutModal}
          onClose={onModalClose}
          mode={"create"}
        />
      )}

      <Row>
        {(workouts || []).map((workout) => {
          return (
            <Col
              key={workout.id}
              lg={6}
              md={8}
              sm={12}
              xs={24}
              xl={4}
              className="margin-5px"
            >
              <WorkoutCardView workout={workout} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default WorkoutLayout;
