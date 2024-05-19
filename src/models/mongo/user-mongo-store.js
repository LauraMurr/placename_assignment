import { User } from "./user.js";

export const userMongoStore = {
  async getAllUsers() {
    return await User.find().lean();
  },

  async getUserById(id) {
    return await User.findById(id).lean();
  },

  async addUser(user) {
    const newUser = new User(user);
    return await newUser.save();
  },

  async getUserByEmail(email) {
    return await User.findOne({ email: new RegExp(`^${email}$`, 'i') }).lean(); // Case insensitive match
  },

  async deleteUserById(id) {
    return await User.findByIdAndDelete(id);
  },

  async deleteAll() {
    return await User.deleteMany({});
  }
};
