import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import passport from "passport";
import cookieSession from "cookie-session";
import cors from "cors";

import "./config.js";
import "./models/User.js";
import "./models/Blog.js";
import "./services/passport.js";
import authRoutes from "./routes/authRoutes.js";
import blogroutes from "./routes/blogRoutes.js";

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

app.use(
  cors({
    origin: process.env.PUBLIC_SITE_URL, // Your Nuxt app URL
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_SECRET],
  })
);

app.use((req, res, next) => {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb) => {
      cb();
    };
  }
  if (req.session && !req.session.save) {
    req.session.save = (cb) => {
      cb();
    };
  }
  next();
});

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
