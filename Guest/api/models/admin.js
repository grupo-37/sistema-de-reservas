import { Schema } from "mongoose";
import User from "./User.js";

export default User.discriminator("Admin", new Schema());