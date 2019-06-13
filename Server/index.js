import express from "express";
import UserRoutes from "./Routes/user";
import TaskRoutes from "./Routes/task";
import "./db";
import bodyParser from "body-parser"
const app = express();
const Router = express.Router();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Credentials', "true");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});
app.use(bodyParser.json())
app.set('PORT', process.env.PORT ? process.env.PORT : 5000);

app.get('/', (req, res) => {
    res.send('Welcome to the Productivo!')
})
app.use('/user', UserRoutes(Router));
app.use('/task', TaskRoutes(Router));

app.listen(app.get('PORT'), _ => {
    console.log(`Service is running on PORT ${app.get('PORT')}`)
});