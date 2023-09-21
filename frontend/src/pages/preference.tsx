import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../context/AuthContext";
import Navbar from "./NavBar";
import Card from "react-bootstrap/Card";
import Login from "./login";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
function PreferencesCard() {
  const { profile, isLoggedIn }: any = useLogin();
  const [items, setItems]: any = useState([]);
  const navigate = useNavigate();
  const { confirm } = Modal;
  useEffect(() => {
    const getComments = async () => {
      const res: Response & any = await fetch(
        `http://localhost:8081/preferences`,
        {
          headers: { Authorization: `Bearer ${profile}` },
        }
      );
      const data = await res.json();
      console.log(data);

      setItems(data.content);
    };
    console.log(items);

    getComments();
  }, []);
  async function deletePref(Id: any) {
    const response: any = await axios.delete(
      `http://localhost:8081/preferences/${Id}`,
      {
        headers: {
          Authorization: `Bearer ${profile}`,
        },
      }
    );
    if (response) {
      console.log(response);
    }
  }
  const navigateToAnotherPage = (item: any) => {
    console.log(item);
    navigate("/editPref", { state: (item = { item }) });
  };
  const notificationPref = (Id: any) => {
    navigate("/notification", { state: (Id = { Id }) });
  };
  const showDeleteConfirm = (Id: any) => {
    confirm({
      title: "Are you sure delete this preference?",
      icon: <ExclamationCircleFilled />,
      content: "",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deletePref(Id);
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return isLoggedIn ? (
    <div>
      <Navbar />
      <h4
        style={{
          marginTop: 60,
          marginLeft: 30,
          marginBottom: 30,
          fontWeight: "bold",
        }}
      >
        {" "}
        Preferences page
        <Button
          type="primary"
          danger
          className="text-center"
          style={{ marginLeft: 500 }}
          onClick={() => navigate("/addPref")}
        >
          ADD
        </Button>
      </h4>
      <div className="container">
        <div className="row m-2">
          {items ? (
            items.map((item: any) => {
              return (
                <Card key={item.Id} style={{ marginBottom: 20 }}>
                  <Card.Header>Preference</Card.Header>
                  <Card.Body>
                    <Card.Title>Preference Id :{item.Id}</Card.Title>
                    <Card.Text>
                      Language: {item.Language} , Currency: {item.Currency}
                    </Card.Text>
                    <Button
                      danger
                      className="text-center"
                      style={{ marginLeft: 10 }}
                      onClick={() => navigateToAnotherPage(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="dashed"
                      className="text-center"
                      style={{ marginLeft: 10 }}
                      onClick={() => showDeleteConfirm(item.Id)}
                    >
                      Delete
                    </Button>
                    <Button
                      danger
                      style={{
                        marginLeft: 130,
                        marginTop: 10,
                        alignContent: "center",
                      }}
                      onClick={() => notificationPref(item.Id)}
                    >
                      Notification
                    </Button>
                  </Card.Body>
                </Card>
              );
            })
          ) : (
            <div>
              <h4>There is no Preferences </h4>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div>
      {" "}
      <Login />{" "}
    </div>
  );
}

export default PreferencesCard;
