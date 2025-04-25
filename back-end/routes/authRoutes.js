import passport from "passport";

const authRoutes = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect(process.env.PUBLIC_SITE_URL + "/blogs");
    }
  );

  app.get("/auth/logout", (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect(process.env.PUBLIC_SITE_URL);
    });
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};

export default authRoutes;
