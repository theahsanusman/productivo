import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    priority: {
        type:String,
        enum: ['low','moderate','high'],
        required:true
    },
    startsAt: Date,
    finishingTime: Date,
    checkList: Array,
    done: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("Task", TaskSchema)