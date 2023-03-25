import { css } from "@emotion/css";
import {
  Button,
  Col,
  Layout,
  Modal,
  message,
  Row,
  Space,
  Form,
  Input,
  Tabs,
} from "antd";
import React, { useEffect, useReducer, useRef } from "react";
import TextView from "../view/TextView";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const { Header, Content } = Layout;

const newPane = {
  label: "Tab 1",
  children: "Lorem Ispum dummy content",
  key: 1,
};

const initialState = {
  content: "",
  posts: "",
  isModalOpen: "",
  tabData: [],
  contents: [],
  activeTabIndex: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTENT":
      return { ...state, content: action.data };
    case "SET_POSTS":
      return { ...state, posts: action.data };
    case "SET_MODAL_STATUS":
      return { ...state, isModalOpen: action.data };
    case "SET_TAB_DATA":
      return { ...state, tabData: action.data };
    case "SET_CONTENTS":
      return { ...state, contents: action.data}
    case "SET_ACTIVE_TAB_INDEX":
      return { ...state, activeTabIndex: action.data };
    default:
      return state;
  }
};

const PostPage = () => {
  const params = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const newTabIndex = useRef(0);

  const { state: locationState } = useLocation();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  useEffect(() => {
   
    if (locationState?.isValid) {
      fetchPost();
      navigate(".", { state: { isValid: false } });
    } else {
      dispatch({ type: "SET_MODAL_STATUS", data: true });
    }
  }, []);

  const fetchPost = async () => {
    const endpoint = `http://localhost:5000/route/${params.path}/posts`;
    const response = await axios.get(endpoint);
    console.log(response);
    if (response.data.success) {
      const { data } = response.data;
      dispatch({ type: "SET_POSTS", data: data });
      // dispatch({ type: "SET_CONTENT", data: data.post.content });
      dispatch({ type: "SET_ACTIVE_TAB_INDEX", data: newTabIndex.current });

      const contents = data.post.content

      dispatch({ type: "SET_CONTENTS", data: contents });
    }
  };

  const addNewPane = () => {
    newTabIndex.current++;
    const content = [...state.contents, {label: '', content: ''}]
    dispatch({ type: "SET_CONTENTS", data: content });
    dispatch({ type: "SET_ACTIVE_TAB_INDEX", data: newTabIndex.current });
  };

  const removePane = (currentkey) => {
    const newContents = state.contents.filter((item, index) => index !== currentkey)
    dispatch({type: 'SET_CONTENTS', data: newContents})

    const activeKey = newContents.length < 2 ? 0 : currentkey-1

    dispatch({type: 'SET_ACTIVE_TAB_INDEX', data: activeKey})
    newTabIndex.current--

  }

  const onEditTab = (targetKey, action) => {
    if (action === "add") {
      addNewPane();
    } else {
      console.log("REMOVE_KEY", targetKey);
      // remove(targetKey);
      removePane(targetKey)
    }
  };

  const handleChangeContent = (e, targetIndex) => {
    const data = [...state.contents]
    data[targetIndex].content = e.target.value
    dispatch({ type: "SET_CONTENTS", data });
    // setContent(e.target.value)
  };

  const handleSubmitAuth = () => {
    form
      .validateFields()
      .then((values) => {
        checkAuth(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const checkAuth = async (values) => {
    const payload = {
      route_name: params.path,
      password: values.password,
    };
    const endpoint = `http://localhost:5000/login`;
    const resposne = await axios.post(endpoint, payload);
    console.log(resposne);
    if (resposne.data.success) {
      fetchPost();
      handleCloseModal();
    }
  };

  const handleSubmit = async () => {
    const { id: post_id } = state.posts.post;
    const payload = {
      content: state.contents,
    };
    const endpoint = `http://localhost:5000/posts/${post_id}`;
    const response = await axios.put(endpoint, payload);
    if (response.data.success) {
      message.success("Updated Successfully");
    }
  };

  const handleCloseModal = () => {
    // setIsModalOpen(false)
    dispatch({ type: "SET_MODAL_STATUS", data: false });

    form.resetFields();
  };

  const onChangeTab = (currentKey) => {
    dispatch({type: 'SET_ACTIVE_TAB_INDEX', data: currentKey})
  }

  const tabItems = state.contents.map((item, index) => {
    return {
        label: `Tab ${index+1}`,
        children: <TextView value={item.content} onChange={(e) => handleChangeContent(e, index)} />,
        key: index,
        closable: state.contents.length > 1
      };
  })

  return (
    <div className={rootContainer}>
      <div className={homePageContentCss}>
        <Row>
          <Col span={24}>
            <Tabs
              items={tabItems}
              type="editable-card"
              onEdit={onEditTab}
              activeKey={state.activeTabIndex}
              onChange={onChangeTab}
            />
          </Col>
          {/* <Col span={24}>
            <TextView value={state.content} onChange={handleChangeContent} />
          </Col> */}
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col span={4} offset={20}>
            <Space>
              <Button>Cancel</Button>
              <Button type="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Space>
          </Col>
        </Row>
      </div>
      <Modal
        title="Unlock the Site"
        open={state.isModalOpen}
        onOk={handleSubmitAuth}
        onCancel={handleCloseModal}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter password to unlock" },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const rootContainer = css`
  min-height: 380px;
`;

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

export default PostPage;
