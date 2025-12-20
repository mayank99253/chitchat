import jwt from 'jsonwebtoken'
import { ENV } from './env.js';

export const generateToken = (userID, res) => {
    const token = jwt.sign(
        { userID },
        ENV.JWT_SECRET,
        { expiresIn: "7d", }
    );
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //MS
        httpOnly: true, // prevent XSS attacks : cross site scripting 
        sameSite: "strict",  // CSRF attacks
        secure: ENV.NODE_ENV === "development" ? false : true
    })
    return token;
}

//http:localhost
//https://hdkdniu.com