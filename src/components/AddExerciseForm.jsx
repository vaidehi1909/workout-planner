import React from "react";
import { Form, InputNumber, Select, Button } from "antd";

const exerciseOptions = [
  {
    value: "back",
    label: "Back",
  },
  {
    value: "legs",
    label: "Legs",
  },
  {
    value: "neck",
    label: "Neck",
  },
  {
    value: "fullbody",
    label: "Full Body",
  },
];

const AddExerciseForm = () => {
  return (
    <Form name="new_form" className="margin-left" preserve={false}>
      <Form.Item
        label="Exercise"
        name="exercise"
        rules={[{ required: true, message: "Please Select Type Of Exercise!" }]}
      >
        <Select options={exerciseOptions} />
      </Form.Item>
      <Form.Item
        label="Set"
        name="set"
        rules={[{ required: true, message: "Please Select Type Of Exercise!" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Ret"
        name="ret"
        rules={[{ required: true, message: "Please Select Type Of Exercise!" }]}
      >
        <InputNumber />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddExerciseForm;
