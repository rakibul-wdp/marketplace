import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.withCredentials = true;

const Home = () => {
  const [user, setUser] = useState();
  const [products, setProducts] = useState([]);

  console.log(products);
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/user", { withCredentials: true })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/allitemlist"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <p> {user && <h2>{user.name}</h2>}</p>
      <input placeholder="Search product" display="flex" />

      <div>
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product._id}>
                <h3>{product.name}</h3>
                <p>Quantity: {product.quantity}</p>
                <p>Price: {product.price}</p>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100px" }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
