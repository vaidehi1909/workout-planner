import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Button, Form, Input, Card, Divider } from "antd";
import { useLoginMutation } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const [login, { isLoading }] = useLoginMutation();

  const onFinish = (values) => {
    login(values).then(() => navigate("/workouts"));
  };

  const handelGoSignup = () => {
    navigate("/signup");
  };

  if (auth.user) {
    return <Navigate to="/workouts" state={{ from: location }} />;
  }

  return (
    <div className="display-center">
      <h1>WebFit</h1>
      <Card
        title={<h2 className="form-title">LogIn </h2>}
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
        >
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
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
          <Divider />
          <h3 className="form-title">Don`t have Account</h3>
          <Button type="primary" onClick={() => handelGoSignup()}>
            Sign Up
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
