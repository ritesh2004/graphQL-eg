var { User } = require("../models/users.models.js");
var jwt = require("jsonwebtoken");
var Apierror = require("../utils/ApiError.js")

const verifyUser = async (req, res, next) => {
    try {
        const { accessToken } = req.cookies;
        // Checking for accessToken
        if (!accessToken) {
            return res.status(405).json(new Apierror(405,"Unauthorized access"))
        }
        const decoded = jwt.verify(accessToken, "rghg-rehfuf-ureggb");
        const user = await User.findById(decoded?.id).select(
            "-password -refreshToken"
        );
        if (!user) {
            return res.status(403).json(new Apierror(403,"Invalid token"))
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json(new Apierror(500,"Something went wrong!"))
    }
};

module.exports = verifyUser;