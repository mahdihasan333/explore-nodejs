import { Model, model, Schema } from "mongoose";
import { IAddress, IUser, UserInstanceMethods } from "../interfaces/user.interface";
import validator from 'validator'
import bcrypt from 'bcryptjs'

const addressSchema = new Schema<IAddress>({
    city: {type: String},
    street: {type: String},
    zip: {type: Number}
}, {
    _id: false
})


const userSchema = new Schema<IUser, Model<IUser>, UserInstanceMethods>({
  firstName: {
    type: String,
    required: [true, "FirstName keno daw nai na dele"],
    trim: true,
    minlength: [3, "First Name must be 3 characters, got {VALUE}"],
    maxlength: 10,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "Last Name must be 3 characters, got {VALUE}"],
    maxlength: 10,
  },
  age: {
    type: Number,
    required: true,
    trim: true,
    // min: 21,
    min: [21, "Age Must be at least 18, got {VALUE}"],
    max: 60,
  },
  email: {
    type: String,
    unique: [true, "Email common hoye geche!!"],
    required: true,
    lowercase: true,
    trim: true,
    // validate: {
    //   validator: function (value) {
    //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    //   },
    //   message: function (props) {
    //     return `Email ${props.value} is not valid email`;
    //   },
    // },
    validate: [validator.isEmail, 'Invalid Email {VALUE}']
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    uppercase: true,
    enum: {
      values: ["USER", "ADMIN", "SUPERADMIN "],
      message: "Role is not valid. got {VALUE} role",
    },
    default: "USER",
  },
  address: {
    type: addressSchema
  }
}, {
    versionKey: false,
    timestamps: true
});

userSchema.method('hashPassword', async function(plainPassword: string){
  const password = await bcrypt.hash(plainPassword, 10);
  return password
})

export const User = model("User", userSchema);
