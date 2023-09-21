import { CascaderProps, Layout } from "antd";
import { Button, Checkbox, Col, Form, Input, Row, Select } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Shared from "../component/shared_Layout";

const { Option } = Select;

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Signup: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    const res = await axios.post("http://localhost:8081/signup", {
      Email: values.email,
      UserName: values.UserName,
      FirstName: values.FirstName,
      LastName: values.LastName,
      Password: values.password,
    });

    if (res.data.success) {
      navigate("/");
    }
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
              Sign up to our board
            </h2>

            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              initialValues={{}}
              style={{ maxWidth: 600 }}
              scrollToFirstError
            >
              <Form.Item
                name="email"
                label="E-mail"
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
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
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

              <Form.Item
                name="UserName"
                label="UserName"
                tooltip="What do you want userName looklike!"
                rules={[
                  {
                    required: true,
                    message: "Please input your UserName!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="FirstName"
                label="FirstName"
                rules={[
                  {
                    required: true,
                    message: "Please input your FirstName!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="LastName"
                label="LastName"
                rules={[
                  {
                    required: true,
                    message: "Please input your LastName!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error("Should accept agreement")),
                  },
                ]}
                {...tailFormItemLayout}
              >
                I already have an account <a href="/">Log in</a>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button danger type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default Signup;
