import mongoose from "mongoose"
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: {
        type: Array,
        required: true
    },
    tokens: Array,
    mobileNumber: {
        type:Number,
        required:true
    }
}, { timestamps: true })


UserSchema.pre('save', function (next) {
    try {
        this.password = bcrypt.hashSync(this.password, 8);
        next();
    } catch (err) {
        return next(err);
    }
})

UserSchema.methods["isValidPassword"] = async function (newPassword) {
    try {
        return bcrypt.compare(newPassword, this.password)
    }
    catch (err) {
        return new Error();
    }
};

module.exports = mongoose.model("User", UserSchema)