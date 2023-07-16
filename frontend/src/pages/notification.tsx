import { useEffect, useState } from "react";
import { Button } from "antd";
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
      console.log("hello")
console.log(data)
      setNotifications(data.content);
    };
    console.log(items);

    getTrans();
  }, []);
  return (
    <div>
<Navbar/>
<h4 style={{marginTop:60 , marginLeft:30 ,marginBottom:30, fontWeight:"bold"}}> Notification for preference :{items.Id} 
<Button type="primary" danger className="text-center" style={{ marginLeft:500 }} onClick={()=>{}}>ADD</Button>
</h4>
    <div className="container">
      <div className="row m-2">
        {notification.length > 0 ? (
          notification.map((item: any) => {
            return (
              <div key={item.Id} className="col-sm-6 col-md-4 v my-2">
                <div
                  className="card shadow-sm w-100"
                  style={{ minHeight: 225 }}
                >
                  <div className="card-body">
                    <h5 className="card-title text-center h2">
                      Id :{item.Id}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted text-center">
                    Type {item.Type} 
                    </h6>
                   
                    <h6 className="card-subtitle mb-2 text-muted text-center">
                     Receiver {item.Receiver}
                    </h6>
                   

                  </div>
                </div>
              </div>
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
