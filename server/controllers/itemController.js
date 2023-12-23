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
