import { Button, Checkbox, Col, Form, Input, Layout, message, Row } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Shared from "../component/shared_Layout";
import { useLogin } from "../context/AuthContext";

export default function Login(): any {
  const { setIsLoggedIn, setProfile }: any = useLogin();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const onFinish = async (values: any) => {
    console.log("Success:", values);

    const res = await axios.post("http://localhost:8081/login", {
      Email: values.email,
      Password: values.password,
    });

    if (res.data.success) {
      setProfile(res.data.token);
      setIsLoggedIn(true);
      if (res.data.data) {
        navigate("/Admin");
      } else {
        navigate("/Home");
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Shared
      text1={"Sign in"}
      text2={"Sign in to our system"}
      children={
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ marginBottom: 80 }}
        >
          <Form.Item
            label="E-Mail"
            name="email"
            rules={[
              { required: true, message: "Please input your E-Mail!" },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 4, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: 90, height: 40 }}
              loading={loading}
            >
              Sign In
            </Button>
            <Button
              danger
              type="primary"
              style={{ width: 90, height: 40 }}
              onClick={() => {
                navigate("/Signup");
              }}
            >
              Signup
            </Button>
          </Form.Item>
        </Form>
      }
    />
  );
}
