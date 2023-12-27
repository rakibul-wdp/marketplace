import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
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
      .post("http://localhost:5000/api/signup", {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => navigate("/login"));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>SignUp</h3>

          <input
            placeholder="name"
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
          />
          <input
            placeholder="email"
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
          />

          <button type="submit">SignUp</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
