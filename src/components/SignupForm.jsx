import React from "react";
import { useSignupMutation } from "../services/auth";
import { Button, Form, Input, Card, Divider } from "antd";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [signup, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { email, password, name } = values;
    signup({ email, password, name }).then(() => navigate("/login"));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handelGoLogin = () => {
    navigate("/login");
  };

  return (
    <div className="display-center">
      <h1> Welcome to WebFit</h1>
      <Card
        title={<h2 className="form-title">Create Account </h2>}
        bordered={false}
        style={{
          width: 500,
        }}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            justifyContent: "center",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
              { min: 8, message: "Password must have a minimum length of 8" },
              // {
              //   pattern: new RegExp(
              //     "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
              //   ),
              //   message:
              //     "Password must contain at least one lowercase letter, uppercase letter, number, and special character",
              // },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input your Confirm Password!",
              },
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Sign Up
            </Button>
          </Form.Item>
          <Divider />
          <h3 className="form-title">Already have Account</h3>

          <Button type="primary" onClick={handelGoLogin}>
            LogIn
          </Button>
        </Form>
      </Card>
    </div>
  );
};
export default SignupForm;
