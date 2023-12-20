import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    length: 8,
  },
  itemList: [itemListSchema],
  transactionHistory: [
    {
      date: {
        type: Date,
      },
      description: String,
      amount: Number,
    },
  ],
});

const User = mongoose.model("User", UserSchema);
export default User;
