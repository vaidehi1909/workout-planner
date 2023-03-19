import React, { useState } from "react";
import { Card, Col, Row, Button, Spin } from "antd";
import ExerciseModal from "./ExerciseModal";
import WorkoutExerciseRow from "./WorkoutExerciseRow";
import { useFetchWorkoutExercisesQuery } from "../../services/exercise";
import { useLocation } from "react-router-dom";
import { isPublicRoute } from "../../helper/locationHelper";

const WorkoutExerciseListView = ({ workout }) => {
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const location = useLocation();
  const { data: workoutExercises, isLoading } = useFetchWorkoutExercisesQuery(
    workout.id
  );

  const onClose = () => {
    setShowExerciseModal(false);
  };
  if (isLoading) {
    return (
      <Spin style={{ marginTop: "150px" }} tip="Loading" size="large">
        <div className="content" />
      </Spin>
    );
  }
  return (
    <div>
      <Card
        bordered={false}
        className="antd-card-margin"
        bodyStyle={{ padding: "6px" }}
      >
        <Row align="middle">
          <Col span={10} offset={1}>
            <h3>Workout Exercise</h3>
          </Col>
          {isPublicRoute(location) ? null : (
            <Col span={12} offset={1} className="align-right">
              <Button onClick={() => setShowExerciseModal(true)}>
                Add Exercise
              </Button>
            </Col>
          )}
        </Row>
      </Card>
      {(workoutExercises || []).map((workoutExercise) => {
        return (
          <WorkoutExerciseRow
            key={workoutExercise.id}
            workoutExercise={workoutExercise}
          />
        );
      })}

      {showExerciseModal && (
        <ExerciseModal
          visible={showExerciseModal}
          onClose={onClose}
          mode={"create"}
          workout_id={workout.id}
        />
      )}
    </div>
  );
};
export default WorkoutExerciseListView;
