import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import { LoginUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";

const rules = [
  {
    required: true,
    message: "required",
  },
];

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await LoginUser(values);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <header className="bg-primary text-white p-4 flex justify-center items-center"
      style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
        <h1 className="text-2xl font-bold">Get your items easier, grab it now!!</h1>
      </header>
      <div
        className="h-screen flex justify-center items-center"
        style={{
          backgroundImage: "url('https://img.freepik.com/free-vector/gradient-technological-background_23-2148884155.jpg?w=1060&t=st=1724767938~exp=1724768538~hmac=f257bf7b866d31ac0bc06e1a2e9e5cc35d4aaa144947a87d8b598fa922642145')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white p-5 rounded w-[450px]">
          <h1 className="text-primary text-2xl">
            E-com - <span className="text-gray-400 text-2xl">LOGIN</span>
          </h1>
          <Divider />
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Email" name="email" rules={rules}>
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={rules}>
              <Input type="password" placeholder="Password" />
            </Form.Item>

            <Button type="primary" htmlType="submit" block className="mt-2 bg-black">
              Login
            </Button>

            <div className="mt-5 text-center">
              <span className="text-gray-500">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary">
                  Register
                </Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
