import User from "../Models/user"
import { sK } from "../Utils/keys"
import JWT from "jsonwebtoken"
const getToken = (user) => {
    return JWT.sign({ _id: user._id }, sK)
}

const signUp = async (req, res) => {
    const newUser = await new User(req.body);
    newUser.save().then(async data => {
        delete data.password
        delete data.tokens
        const token = getToken(data);
        await saveToken(data._id, token)
        return res.status(200).json({ status: true, user: data, token })
    }).catch(err => {
        return res.status(400).json({ status: false, err })
    })
}

const logIn = async (req, res) => {
    const { mobileNumber, password } = req.body;
    const userFound = await User.findOne({ mobileNumber });
    if (!userFound) return res.status(400).json({ status: false, err: 'User not Found!' })
    if (await !userFound.isValidPassword(password)) return res.status(400).json({ status: false, err: 'Password is Incorrect!' })
    userFound.password = ''
    userFound.tokens = {}
    const token = getToken(userFound);
    await saveToken(userFound._id, token)
    return res.status(200).json({ status: true, user: userFound, token })
}

const logOut = async (req, res) => {
    await removeToken()
    return res.status(200).json({ status: true })
}

const saveToken = (_id, token) => {
    return User.updateOne({ _id }, { $push: { tokens: token } });
}

const removeToken = (_id = req.user._id, token = req.token) => {
    req.user.tokens = req.user.tokens.filter(t => t !== token)
    return User.updateOne({ _id }, req.user).then(user => user).catch(err => err)
}
module.exports = { signUp, logIn, logOut };