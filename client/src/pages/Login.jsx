import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/index";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/login", {
        email: inputs.email,
        password: inputs.password,
      })

      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => {
        const res = data.user;
        if (res && res._id) {
          dispatch(authActions.login({ userId: res._id }));
          navigate("/user");
        } else {
          console.log("Login failed. Please check your credentials.");
        }
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>login</h3>

          <input
            placeholder="email"
            name="email"
            type="email"
            value={inputs.email}
            onChange={handleChange}
          />
          <input
            placeholder="password"
            name="password"
            type="password"
            value={inputs.password}
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
