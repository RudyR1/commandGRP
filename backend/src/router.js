const express = require("express");
const router = express.Router();

const usersControllers = require("./controllers/usersControllers");
const mailControllers = require("./controllers/mailControllers");
const schema = require("./services/joiValidator");
const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./services/checkAuth");

//Login & Register Routes
router.post("/register", [schema, hashPassword], usersControllers.add);
router.post("/login", usersControllers.getUserByEmail, verifyPassword);
router.post(
  "/forgotpassword",
  usersControllers.getUserByEmail,
  mailControllers.sendMailResetById
);
router.put("/resetpassword", hashPassword, usersControllers.editUserPassword);

//Protected Routes
router.use(verifyToken);

router.get("/users", usersControllers.browse);
router.put("/users/:id", hashPassword, usersControllers.edit);
router.post("/logout", usersControllers.deleteSession);

module.exports = router;
