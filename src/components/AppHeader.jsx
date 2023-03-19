import React from "react";
import { Row, Col, Button, Dropdown, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../services/auth";
import { useAuth } from "../hooks/useAuth";

const AppHeader = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const auth = useAuth();
  const onLogout = () => {
    logout().then(() => navigate("/login"));
  };
  const items = [
    {
      label: (
        <Button onClick={onLogout} loading={isLoading}>
          Logout
        </Button>
      ),
      key: "0",
    },
  ];
  return (
    <Row align="middle">
      <Col span={20}>
        <h1> WebFit</h1>
      </Col>
      <Col span={4} className="align-right">
        <Dropdown.Button
          menu={{
            items,
          }}
          trigger={["click"]}
          icon={<UserOutlined />}
        >
          <Space>{auth?.user?.user_metadata?.name}</Space>
        </Dropdown.Button>
      </Col>
    </Row>
  );
};

export default AppHeader;
