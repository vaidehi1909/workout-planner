import React from "react";
import { Layout } from "antd";
import AppHeader from "./AppHeader";
import { Outlet } from "react-router-dom";

const { Header, Content } = Layout;

const Dashboard = () => {
  return (
    <Layout>
      <Header>
        <AppHeader />
      </Header>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};
export default Dashboard;
