import { User } from "./user.js";
import mongoose from "mongoose";

export const userMongoStore = {
  async getAllUsers() {
    return await User.find().lean();
  },

  /* async getUserById(id) {
    return await User.findById(id).lean();
  }, */
  async getUserById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await User.findById(id).lean();
  },

  async addUser(user) {
    const newUser = new User(user);
    await newUser.save();
    return await this.getUserById(newUser._id);
  },

  async getUserByEmail(email) {
    return await User.findOne({ email: new RegExp(`^${email}$`, 'i') }).lean(); 
  },

  /* async deleteUserById(id) {
    return await User.findByIdAndDelete(id).lean();
  }, */
  async deleteUserById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await User.findByIdAndDelete(id);
  },

  async deleteAll() {
    return await User.deleteMany({}).lean();
  }
};
