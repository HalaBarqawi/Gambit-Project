import { Button, DatePicker, Form, Input, Radio, Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useLogin } from "../context/AuthContext";
import Login from "./login";

const AddNotification = (props: any) => {
  const { isLoggedIn, profile }: any = useLogin();
  // const [isEmail, setIsEmail] = useState(true);

  const onFinish = async (values: any) => {
    console.log(values);
    const response: any = await axios.post(
      `http://localhost:8081/preferences/${props.Id}/notifications`,
      { Type: values.Type, Receiver: values.Receiver , ReceiverConfirmedDate: values.Date},
      {
        headers: {
          Authorization: `Bearer ${profile}`,
        },
      }
    );

    if (response) {
      console.log(response);
      Modal.success({
        content: 'Done',
      });
      props.setModal2Open(false)
    }
  };
  // const changeInput = (value: any) => {
  //   console.log(value);
  //   console.log(value.Type);

  //   if (value.Type === "phone") {
  //     setIsEmail(false);
  //     console.log("Iam phone");
  //   } else {
  //     setIsEmail(true);
  //   }
  // };
  return isLoggedIn ? (
    <>
      <Modal
        title="Vertically centered modal dialog"
        centered
        open={props.modal2Open}
        onOk={() => props.setModal2Open(false)}
        onCancel={() => props.setModal2Open(false)}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ Type: "email", }}
          onFinish={onFinish}
          // onValuesChange={changeInput}
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Type" name="Type" rules={[{ required: true }]}>
            <Radio.Group defaultValue="email">
              <Radio.Button value="email"> email </Radio.Button>
              <Radio.Button value="phone"> phone </Radio.Button>
            </Radio.Group>
          </Form.Item>
         
            <Form.Item
              label="Receiver"
              name="Receiver"
              rules={[{ required: true, message: "Please input your phone number OR Email"}]}
            >
              <Input placeholder="admin@example.com / 059-995-415" />
            </Form.Item>
          

          <Form.Item label="Recieved Date" name="Date">
            <DatePicker />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>{" "}
          </Form.Item>
        </Form>
      </Modal>
    </>
  ) : (
    <div>
      {" "}
      <Login />{" "}
    </div>
  );
};

export default AddNotification;
