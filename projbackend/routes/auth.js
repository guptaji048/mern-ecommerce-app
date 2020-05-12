const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { signup, signin, signout, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name").isLength({ min: 3 }),
    check("email").isEmail(),
    check("password")
      .isLength({ min: 6 })
      .withMessage("must be atleast 6 character long")
  ],
  signup
);
router.post(
  "/signin",
  [
    check("email")
      .isEmail()
      .withMessage("Email is required.!"),
    check("password")
      .isLength({ min: 1 })
      .withMessage("Password is required.!")
  ],
  signin
);
router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
  res.send("A Protected Route");
});

module.exports = router;
