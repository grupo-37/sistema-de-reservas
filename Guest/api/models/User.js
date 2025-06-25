import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    // - firstName String
    // - lastName String
    // - email String
    // - password String
    // - role String
    // - verified Boolean default false
    // - birthday Date
    // - phone String
    // - PaymentMethod String
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
    birthday: {
      type: date,
      default: false,
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
  
    timestamps: true,
    discriminatorKey: "role",
  }
);

export default model("User", userSchema);
