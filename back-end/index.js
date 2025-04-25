import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import passport from "passport";
import cookieSession from "cookie-session";

import "./config.js";
import "./models/User.js";
import "./models/Blog.js";
import "./services/passport.js";
import authRoutes from "./routes/authRoutes.js";
import blogroutes from "./routes/blogRoutes.js";

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_SECRET],
  })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
blogroutes(app);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
