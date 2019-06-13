import JWT from "jsonwebtoken"
import { sK } from './keys'
import User from "../Models/user"

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).json({ status: false, err: 'LogIn to Access this information' })
    JWT.verify(token, sK, async (err, decoded) => {
        if (err) return res.status(403).json({ status: false, err: 'Failed to Authenticate, LogIn Again' })
        const foundUser = await User.findOne({ _id: decoded._id })
        if (!foundUser) return res.status(403).json({ status: false, err: 'Failed to Authenticate, LogIn Again' })
        if (foundUser.tokens.findIndex(t => t !== token) == -1) return res.status(403).json({ status: false, err: 'Failed to Authenticate, LogIn Again' })
        req.user = foundUser;
        req.token = token
        return next();
    })
}

module.exports = {
    authenticate
};