import { signUp, logIn, logOut } from "../Controllers/user"
import { authenticate } from "../Utils/authenticate"

module.exports = Router => {
    Router.post('/signUp', signUp)
    Router.post('/logIn', logIn)
    Router.post('/logOut',authenticate, logOut)
    return Router;
}