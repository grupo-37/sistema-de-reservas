import { Schema } from "mongoose";
import User from "./User.js";

const hostSchema = new Schema({
  birthday: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  rfc: {
    type: String,
    required: true,
  },
});

export default User.discriminator("Host", hostSchema);
