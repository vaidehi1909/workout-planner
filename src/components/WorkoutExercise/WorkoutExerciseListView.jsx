import React, { useState } from "react";
import { Card, Col, Row, Button, Form, Modal, Spin } from "antd";
import AddExerciseForm from "./AddExerciseForm";
import WorkoutExerciseRow from "./WorkoutExerciseRow";
import {
  useFetchWorkoutExercisesQuery,
  useCreateWorkoutExerciseMutation,
  useFetchExercisesQuery,
} from "../../services/exercise";

const WorkoutExerciseListView = ({ workout }) => {
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const { data: workoutExercises, isLoading } = useFetchWorkoutExercisesQuery(
    workout.id
  );
  const { data: exercises } = useFetchExercisesQuery();
  const [createWorkoutExercise, { isLoading: isCreating }] =
    useCreateWorkoutExerciseMutation();
  const [form] = Form.useForm();
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
          <Col span={12} offset={1} className="align-right">
            <Button onClick={() => setShowExerciseModal(true)}>
              Add Exercise
            </Button>
          </Col>
        </Row>
      </Card>
      {(workoutExercises || []).map((exercise) => {
        return <WorkoutExerciseRow key={exercise.id} exercise={exercise} />;
      })}

      {showExerciseModal && (
        <Modal
          title={`Create Exercise`}
          open={showExerciseModal}
          okText={"Save"}
          confirmLoading={isCreating}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                const { exercise_id, ...rest } = values;
                const { name, description } = exercises.find(
                  (e) => e.id === exercise_id
                );
                const data = {
                  name,
                  description,
                  workout_id: workout.id,
                  ...rest,
                };
                createWorkoutExercise(data)
                  .then((res) => {
                    console.log(res);
                    onClose();
                  })
                  .catch((err) => console.error(err));
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }}
          onCancel={onClose}
          destroyOnClose
          maskClosable={false}
        >
          <AddExerciseForm form={form} exercises={exercises} />
        </Modal>
      )}
    </div>
  );
};
export default WorkoutExerciseListView;
