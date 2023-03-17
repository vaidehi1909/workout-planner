import React from "react";
import WorkoutForm from "./WorkoutForm";
import { Modal, Form } from "antd";
import { useCreateWorkoutMutation } from "../services/workout";
import { useAuth } from "../hooks/useAuth";

const toCapitlize = (word) => {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const WorkoutModal = ({ visible, onClose, mode }) => {
  const auth = useAuth();
  const [form] = Form.useForm();
  const [createWorkout, { isLoading }] = useCreateWorkoutMutation();

  return (
    <Modal
      title={`${toCapitlize(mode)} Workout`}
      open={visible}
      okText={"Save"}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            createWorkout({
              ...values,
              profile_id: auth.user.id,
            }).then((res) => {
              console.log(res);
              onClose();
            });
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={onClose}
      destroyOnClose
      maskClosable={false}
    >
      <WorkoutForm form={form} />
    </Modal>
  );
};

export default WorkoutModal;
