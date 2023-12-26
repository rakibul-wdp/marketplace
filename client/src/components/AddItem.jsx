import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const AddItem = () => {
  const [inputs, setInputs] = useState({
    itemName: "",
    quantity: "",
    price: "",
    image: "",
  });

  const userId = useSelector((state) => state.auth.userId);
  console.log("userId:", userId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const validate = (item) => {
    const error = {};

    if (!/^[A-Za-z\s]+$/.test(item.itemName)) {
      error.itemName = "name contain only alphabets & spaces";
    }

    if (!/^\d+$/.test(item.quantity)) {
      error.quantity = "Please enter a valid quantity (positive integer)";
    }

    if (!/^\d*\.?\d+$/.test(item.price)) {
      error.price = "Please enter a valid price (number)";
    }

    if (!/^(ftp|http|https):\/\/[^ "]+$/.test(item.image)) {
      error.image = "Please enter a valid image URL";
    }

    return error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErr = validate(inputs);

    if (Object.keys(newErr).length === 0) {
      axios.post("http://localhost:5000/api/additem", {
        inputs,
        userId: userId,
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="itemName"
          type="text"
          name="name"
          value={inputs.itemName}
          onChange={handleChange}
        />
        <input
          placeholder="quantity"
          type="number"
          name="quantity"
          value={inputs.quantity}
          onChange={handleChange}
        />
        <input
          placeholder="price"
          type="number"
          name="price"
          value={inputs.price}
          onChange={handleChange}
        />

        <input
          placeholder="image"
          type="url"
          name="image"
          value={inputs.image}
          onChange={handleChange}
        />

        <button type="submit"> Add item </button>
      </form>
    </div>
  );
};

export default AddItem;
