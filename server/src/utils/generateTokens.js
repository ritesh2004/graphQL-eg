var jwt = require("jsonwebtoken");

const generateAccessToken = (id, email, name, photoURL) => {
    return jwt.sign(
        {
            id,
            email,
            name,
            photoURL,
        },
        "rghg-rehfuf-ureggb",
        {
            expiresIn: 1000 * 60 * 60 * 24,
        }
    );
};

const generateRefreshToken = (id) => {
    return jwt.sign(
        {
            id,
        },
        "fuhrhug-rguhtg-reigg",
        {
            expiresIn: 1000 * 60 * 60 * 24 * 7,
        }
    );
};

module.exports = { generateAccessToken, generateRefreshToken };