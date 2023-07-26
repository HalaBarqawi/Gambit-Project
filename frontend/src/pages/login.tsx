import { Button, Col, Form, Input, Layout, message, Row } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../context/AuthContext";
import "../assets/App.css";

export default function Login(): any {
  const { setIsLoggedIn, setProfile }: any = useLogin();

  const navigate = useNavigate();

  const [loading] = useState(false);
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
    message.error(errorInfo);
  };
  return (
    <Layout
      className="layout "
      style={{ backgroundColor: "#73337d", height: 750 }}
    >
      <Row style={{ height: "85vh", alignItems: "center" }}>
        <Col
          xs={{
            span: 22,
            offset: 1,
          }}
          md={{
            span: 8,
            offset: 8,
          }}
        >
          <h1
            className="text-center font"
            style={{ marginTop: 50, color: "#fff", fontWeight: "bold" }}
          >
            Gambit Board
          </h1>
        </Col>
        <Col
          xs={{
            span: 22,
            offset: 1,
          }}
          md={{
            span: 8,
            offset: 8,
          }}
        >
          <div
            style={{
              backgroundColor: "#c99fc9",
              borderRadius: 25,
              padding: 30,
              boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.2)",
              opacity: "0.8",
            }}
          >
            <h2
              className="text-center font"
              style={{ marginBottom: 30, color: "#fff" }}
            >
              Sign In to our board
            </h2>

            <Form
              name="basic"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              style={{ marginBottom: 80 }}
            >
              <Form.Item
                label="E-Mail  "
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
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                <Button
                  danger
                  type="primary"
                  htmlType="submit"
                  style={{ width: 80, height: 35 }}
                  className="text-center"
                  loading={loading}
                >
                  Sign In
                </Button>

                <h6>
                  You don't have an account ?
                  <Button
                    danger
                    type="link"
                    // type="primary"
                    style={{ width: 50, height: 35, fontWeight: "bold" }}
                    onClick={() => {
                      navigate("/Signup");
                    }}
                  >
                    Signup
                  </Button>
                </h6>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}
