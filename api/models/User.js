import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    // - firstName String
    // - lastName String
    // - email String
    // - password String
    // - role String
    // - verified Boolean default false
    // - (timestamp)

    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
    discriminatorKey: "role",
  }
);

<<<<<<< HEAD
export default model("User", userSchema);
=======
export default model("User", userSchema);
>>>>>>> 602b1c6a0324f91e416966892b8a18ce465a2712
