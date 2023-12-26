import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [value, setValue] = useState();

  return (
    <div>
      <h4>MarketPlace</h4>
      <div>
        <div onChange={(e, val) => setValue(val)} value={value}>
          <Link to="/">SignUp</Link>
          <Link to="/login">Login</Link>
          <Link to="/home">Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
