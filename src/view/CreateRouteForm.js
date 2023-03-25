import React, { useState } from "react";
import { css } from "@emotion/css";
import {
  Col,
  Row,
  Input,
  Button,
  Typography,
  Space,
  message,
  Modal,
  Form,
} from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const { Text } = Typography;

const HomePageContent = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [url, setUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onChangeUrlPath = (e) => {
    setUrl(e.target.value);
  };

  const handleCreate = () => {
    setIsModalOpen(true);
    console.log(url);
  };

  const saveRoute = async (values) => {
    console.log(values);
    const endpoint = `http://localhost:5000/route`;
    try {
      const response = await axios.post(endpoint, {
        name: url,
        password: values.password,
      });
      if (response.data.success) {
        return navigate(`/dir/${url}`, { state: { isValid: true } });
      }
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message);
      }
    }
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        saveRoute(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <div className={homePageContentCss}>
        <Row>
          <Col xs={24}>
            <Space>
              <Text>Create new URL : </Text>
              <Input
                size="large"
                style={{ width: "300px" }}
                onChange={onChangeUrlPath}
              ></Input>
              <Button size="large" onClick={handleCreate}>
                Create
              </Button>
            </Space>
          </Col>
        </Row>
      </div>
      <Modal
        title="Secure your Route"
        open={isModalOpen}
        okText={"Create"}
        onOk={handleSubmit}
        onCancel={handleCloseModal}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirm_password"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please input confirm password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const homePageContentCss = css`
  background: #fff;
  width: calc(100% - 200px);
  margin: auto;
  min-height: 70px;
  margin-top: 100px;
  box-shadow: 1px 11px 21px #ccc;
  border-radius: 8px;
  padding: 22px;
  text-align: center;
`;

export default HomePageContent;
