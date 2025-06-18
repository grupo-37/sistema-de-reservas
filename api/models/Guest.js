import { Schema } from "mongoose";
import User from "./User.js";

const guestSchema = new Schema({
  // - birthday Date
  // - phone String
  // - paymentMethod String

  birthday: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
});

export default User.discriminator("Guest", guestSchema);
