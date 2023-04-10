import "../assets/App.css"
import { useLogin } from "../context/AuthContext";
import { Button, Space } from 'antd';
import { useNavigate } from "react-router-dom";

export default function Home() {
    const { isLoggedIn, setIsLoggedIn, setProfile }: any = useLogin();
    const navigate = useNavigate();
    function logout() {
        setIsLoggedIn(false);
        setProfile({});
        navigate("/")
    }
    return (
        isLoggedIn ? (
            <div className="App">
                <Space direction="vertical">

                    <Space>
                        <Button danger type="text" onClick={logout}>
                            Logout
                        </Button>
                    </Space>

                </Space>
                <h1>Welcome to Home</h1>
            </div>
        ) : (
            <div>
                <h1>Unauthorized</h1>
            </div>
        )
    );
}
