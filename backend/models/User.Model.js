import mongoose from 'mongoose'

const userSchema = new  mongoose.Schema({
  email: {
    type: String,
    required: [true,"Email required"],
    unique: true,
  },
  name: {
    type: String,
    required: [true,"Name required"],
  },
  password: {
    type: String,
    required: [true,"Password required"],
  },
  admin: {
    type: Boolean,
    default: false,
  },
 
}, { timestamps: true });

export const UserModel = mongoose.model('User', userSchema);

