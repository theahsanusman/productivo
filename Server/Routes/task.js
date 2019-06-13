import { post ,update,remove,get} from "../Controllers/post"
import { authenticate } from "../Utils/authenticate"

module.exports = Router => {
    Router.post('/', authenticate, post)
    Router.patch('/', authenticate,update)
    Router.delete('/:id', authenticate,remove)
    Router.get('/', authenticate,get)
    return Router;
}