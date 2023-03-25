import { css } from "@emotion/css";
import { Layout, Menu, Row, Col, Card, Form, Input, Button, Typography, Space } from "antd";
import React from "react";
import AppRouter from "./router";
const { Header, Content, Footer } = Layout;
const { Text, Title } = Typography

const Wrapper = () => {

    const formItemLayout = {
        labelCol: {
            xs: {
            span: 24,
            },
            sm: {
            span: 8,
            },
        },
        wrapperCol: {
            xs: {
            span: 24,
            },
            sm: {
            span: 16,
            },
        },
    };
  return (
    <Layout>
      <Header>
        <div className={logo}></div>
        <Menu
          theme="dark"
          mode="horizontal"
         
        />
      </Header>
      <Content>
        <AppRouter />
      </Content>
      {/* <Footer></Footer> */}
    </Layout>
  );
};

const rootContainer = css`
  min-height: 380px;
`

const logo = css`
float: left;
width: 120px;
height: 31px;
margin: 16px 24px 16px 0;
background: rgba(255, 255, 255, 0.3);
`

export default Wrapper;
