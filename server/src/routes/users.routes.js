var { Router } = require("express");
const {
    register,
    login,
    getUser,
    logout,
    getAccessToken,
} = require("../controllers/users.controllers.js");
const verifyUser = require("../middleware/users.middleware.js");

const userRouter = Router();

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.post("/getuser", verifyUser, getUser);

userRouter.post("/logout", verifyUser, logout);

userRouter.post("/accesstoken", getAccessToken);

module.exports = userRouter;