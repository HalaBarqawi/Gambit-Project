import { useEffect, useState } from "react";
import { Button } from "antd";
import Card from "react-bootstrap/Card";

import { useLocation } from "react-router";
import { useLogin } from "../context/AuthContext";
import Navbar from "./NavBar";
function NotificationCard() {
  const location = useLocation();
  const items = location.state;
  const [notification, setNotifications] = useState([]);
  const { isLoggedIn, profile }: any = useLogin();

  useEffect(() => {
    const getTrans = async () => {
      const res: Response & any = await fetch(
        `http://localhost:8081/preferences/${items.Id}/notifications`,
        {
          headers: { Authorization: `Bearer ${profile}` },
        }
      );
      const data = await res.json();
      console.log(data);
      setNotifications(data.content);
    };
    console.log(items);

    getTrans();
  }, []);
  function toDate(date: Date) {
    return date.getFullYear() + " / " + date.getMonth() + "/" + date.getDate();
  }
  return (
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
        Notification for preference :{items.Id}
        <Button
          type="primary"
          danger
          className="text-center"
          style={{ marginLeft: 500 }}
          onClick={() => {}}
        >
          ADD
        </Button>
      </h4>
      <div className="container">
        <div className="row m-2">
          {notification.length > 0 ? (
            notification.map((item: any) => {
              return (
                <Card className="text-center">
                  <Card.Header>Notification {item.Id}</Card.Header>
                  <Card.Body>
                    <Card.Title>
                      Notification for Preference with Id : {item.preference_Id}
                    </Card.Title>
                    <Card.Text>
                      Type: {item.Type} , Receiver: {item.Receiver}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    Recieved Date :{" "}
                    {toDate(new Date(item.ReceiverConfirmedDate))}
                  </Card.Footer>
                </Card>
              );
            })
          ) : (
            <div>
              <h4>There is no notification for this preference </h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationCard;
