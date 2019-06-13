import mongoose from "mongoose";
mongoose.connect("mongodb+srv://admin:SO9zLjdr7gCCE4OO@productivo-kf6qy.mongodb.net/test", { useNewUrlParser: true });
let db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", _ => { console.log("Database is connected!"); return db; });
