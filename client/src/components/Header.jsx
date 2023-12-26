import { useState } from "react";
import { Link } from "react-router-dom";

const Headers = () => {
  const [value, setValue] = useState();

  return (
    <div>
      <h4>MarketPlace</h4>
      <div>
        <div onChange={(e, val) => setValue(val)} value={value}>
          <Link label="SignUp" to="/" />
          <Link label="Login" to="/login" />
          <Link label="Home" to="/home" />
        </div>
      </div>
    </div>
  );
};

export default Headers;
