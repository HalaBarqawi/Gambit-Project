// import "../assets/App.css"
// import { useLogin } from "../context/AuthContext";
// import { Button, Form, Select, Space } from 'antd';
// import { useLocation, useNavigate } from "react-router-dom";

// import "../assets/App.css"

// import type { FormInstance } from 'antd/es/form';
// import Navbar from "./NavBar";
// import axios from "axios";
// export default function EditPref(props:any) {
//     const { isLoggedIn, setIsLoggedIn, setProfile  }: any = useLogin();
//     const location = useLocation();
//     const items= location.state;
//   console.log(items.item)
//     return (
//         isLoggedIn  ? (
//             <div>
//                 <Navbar/>
//         <h4 style={{marginTop:60}}> Add new Preference</h4>
//             <Form
//             {...layout}
//             ref={formRef}
//             name="control-ref"
//             onFinish={onFinish}
//             style={{ maxWidth: 600 , marginTop:40}}
//           >
//             <Form.Item name="Language" label="Language" rules={[{ required: true }]}>
//               <Select
//                 placeholder="Select a option "
//                 // onChange={onLanguageChange}

//                 allowClear
//               >
//                 <Option value="Arabic">Arabic</Option>
//                 <Option value="English">English</Option>
//                 <Option value="other">other</Option>
//               </Select>
//             </Form.Item>
//             <Form.Item name="Currency" label="Currency" rules={[{ required: true }]}>

//               <Select
//                 placeholder="Select a option "
//                 // onChange={onCurrencyChange}
//                 allowClear
//               >
//                 <Option value="Euro">Euro</Option>
//                 <Option value="Dollar">Dollar</Option>
//                 <Option value="Dinar">Dinar</Option>
//                 <Option value="other">other</Option>
//               </Select>
//             </Form.Item>

//             <Form.Item {...tailLayout}>
//               <Button type="primary" htmlType="submit">
//                 Submit
//               </Button>
//               <Button htmlType="button" onClick={onReset}>
//                 Reset
//               </Button>

//             </Form.Item>
//           </Form>
//           </div>
//         ) : (
//             <div>
//                 <h1>Unauthorized</h1>
//             </div>
//         )
//     );
// }
import "../assets/App.css";
import { useLogin } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import type { FormInstance } from "antd/es/form";
import Navbar from "./NavBar";
import axios from "axios";
import Login from "./login";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
export default function EditPref() {
  const { isLoggedIn, profile }: any = useLogin();

  const formRef = React.useRef<FormInstance>(null);

  const location = useLocation();
  const items = location.state;
  const onFinish = async (values: any) => {
    const response: any = await axios.put(
      `http://localhost:8081/preferences/${items.item.Id}`,
      { Language: values.Language, Currency: values.Currency },
      {
        headers: {
          Authorization: `Bearer ${profile}`,
        },
      }
    );

    if (response) {
      console.log(response);
    }
  };

  const onReset = () => {
    formRef.current?.resetFields();
  };

  return (isLoggedIn ? (
    <div>
      <Navbar />
      <h4 style={{ marginTop: 60 }}> Updatr Preference</h4>
      <Form
        {...layout}
        ref={formRef}
        name="control-ref"
        onFinish={onFinish}
        style={{ maxWidth: 600, marginTop: 40 }}
      >
        <Form.Item name="Language" label="Language">
          <Select
            placeholder="Select a option "
            // onChange={onLanguageChange}
            defaultValue={items.item.Language}
            allowClear
          >
            <Option value="Arabic">Arabic</Option>
            <Option value="English">English</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item name="Currency" label="Currency">
          <Select
            placeholder="Select a option "
            // onChange={onCurrencyChange}
            defaultValue={items.item.Currency}
            allowClear
          >
            <Option value="Euro">Euro</Option>
            <Option value="Dollar">Dollar</Option>
            <Option value="Dinar">Dinar</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Edit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  ) : (
    <div>
    {" "}
    <Login />{" "}
  </div>
  ));
}
