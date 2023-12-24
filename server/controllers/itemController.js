import User from "../models/userModel";

export const addItemList = async (req, res, next) => {
  const { _id, item } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById({ _id });
  } catch (err) {
    return new err();
  }

  if (!_id) {
    return res.status(400).json({ message: "unable to add, user not found" });
  }

  const newItem = {
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    image: item.image,
  };

  existingUser.itemList.push(newItem);
  try {
    await existingUser.save();
  } catch (err) {
    return res.status(500).json({ message: "error occur during adding item" });
  }

  res.status(201).json({ message: "Item added successfully" });
};

export const allProduct = async (req, res, next) => {
  try {
    const allUsers = await User.find({});

    if (!allUsers) {
      return res.status(404).json({ message: "No user exist" });
    }

    let allProduct = [];

    allUsers.forEach((user) => {
      if (user.itemList && user.itemList.length > 0) {
        allProduct = allProduct.concat(user.itemList);
      }
    });

    if (allProduct.length === 0) {
      return res.status(404).json({ message: "No product available" });
    }

    res.status(201).json(allProduct);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
};
