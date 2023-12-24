import User from "../models/userModel";

export const auctionItem = async (req, res, next) => {
  const { _id, itemId } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(_id);
  } catch (err) {
    return res.status(500).json({ message: "Error finding user" });
  }

  if (!existingUser) {
    return res.status(400).json({ message: "User not found" });
  }

  let foundItem = false;

  for (let i = 0; i < existingUser.itemList.length; i++) {
    const item = existingUser.itemList[i];
    if (item._id.equals(itemId)) {
      if (item.isAuctioned) {
        return res.status(400).json({ message: "Item is already in auction" });
      }
      item.isAuctioned = true;
      foundItem = true;
      break;
    }
  }

  if (!foundItem) {
    return res.status(400).json({ message: "Item not found in itemList" });
  }

  try {
    await existingUser.save();
    return res
      .status(200)
      .json({ message: "Item added to auction successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error adding item to auction" });
  }
};

export const allAuctionItem = async (req, res, next) => {
  try {
    const allUsers = await User.find({});

    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({ message: "No users or items found" });
    }

    let auctionedItemsWithUserDetails = [];

    allUsers.forEach((user) => {
      if (user.itemList && user.itemList.length > 0) {
        const auctionedItems = user.itemList.filter(
          (item) => item.isAuctioned === true
        );
        if (auctionedItems.length > 0) {
          auctionedItems.forEach((item) => {
            const itemWithUserDetails = {
              userId: user._id,
              itemId: item._id,
            };
            auctionedItemsWithUserDetails.push(itemWithUserDetails);
          });
        }
      }
    });

    if (auctionedItemsWithUserDetails.length === 0) {
      return res.status(404).json({ message: "No auctioned items available" });
    }

    res.status(200).json(auctionedItemsWithUserDetails);
  } catch (err) {
    res.status(500).json({ message: "Error fetching auctioned items" });
  }
};
