import mongoose from "mongoose";
import "../models/User.js";
import "../models/Blog.js";

const User = mongoose.model("User");
const Blog = mongoose.model("Blog");

export const seedDatabase = async () => {
  const existingUsers = await User.find();
  if (existingUsers.length) {
    console.log("Seed skipped: User already exists.");
    return;
  }

  const user = new User({
    googleId: "test-google-id-123",
    displayName: "Test User",
  });
  await user.save();

  const blog = new Blog({
    title: "Hello from seed!",
    content: "This is a seeded blog post.",
    _user: user._id,
  });
  await blog.save();

  console.log("Database seeded with one user and one blog.");
};
