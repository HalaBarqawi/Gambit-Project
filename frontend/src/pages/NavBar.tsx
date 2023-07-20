import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/Navbar.css";
import { Space, Button } from "antd";
import { useLogin } from "../context/AuthContext";
export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const { setIsLoggedIn, setProfile }: any = useLogin();
  const navigate = useNavigate();
  function logout() {
    setIsLoggedIn(false);
    setProfile({});
    navigate("/");
  }
  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <nav>
      {(toggleMenu || screenWidth > 500) && (
        <ul className="list">
          <li
            className="items"
            style={{ marginRight: 100, fontWeight: "bold" }}
          >
            {"Gambit Bored"}
          </li>
          <li className="items">
            <Link to="/Home" relative="path" className="link">
              Home
            </Link>
          </li>
          <li className="items">
            <Link to="/preferences" relative="path" className="link">
              Setting
            </Link>
          </li>
          <li className="items" style={{ marginLeft: 700 }}>
            <Space direction="vertical">
              <Space>
                <Button danger type="text" onClick={logout}>
                  Logout
                </Button>
              </Space>
            </Space>
          </li>
        </ul>
      )}

      <button onClick={toggleNav} className="btn">
        BTN
      </button>
    </nav>
  );
}
