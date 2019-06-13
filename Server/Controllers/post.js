import Task from "../Models/task"
import User from "../Models/user"
import mongoose from "mongoose"

const addNewTaskIdToProfile = (req, id) => {
    req.user.tasks.push(id);
    return User.updateOne({ _id: req.user._id }, req.user).then(_ => {
        return true;
    }).catch(err => {
        return err;
    })
}

const post = (req, res) => {
    const newTask = new Task(req.body);
    newTask.save().then(async task => {
        if (await addNewTaskIdToProfile(req, task._id)) res.status(200).json({ status: true, task })
    }).catch(err => {
        return res.status(400).json({ status: false, err })
    })
}

const update = (req, res) => {
    let task = req.body.task;
    if (task.checkList) {
        task.checkList = task.checkList.map(subTask => ({ title: subTask, done: false }))
    }
    Task.updateOne({ _id: req.body.task._id }, task).then(_ => {
        res.status(200).json({ status: true })
    }).catch(err => {
        res.status(400).json({ status: false, err })
    })
}

const remove = (req, res) => {
    Task.deleteOne({ _id: req.params.id }).then(_ => {
        res.status(200).json({ status: true })
    }).catch(err => {
        res.status(400).json({ status: false, err })
    })
}

const get = (req, res) => {
    Task.find({
        '_id': {
            $in:
                req.user.tasks.map(task => mongoose.Types.ObjectId(`${task._id}`))
        }
    }).then(tasks => {
        const highPriorityTasks = tasks.filter(task => task.priority === 'high')
        const moderatePriorityTasks = tasks.filter(task => task.priority === 'moderate')
        const lowPriorityTasks = tasks.filter(task => task.priority === 'low')
        tasks = [...highPriorityTasks, ...moderatePriorityTasks, ...lowPriorityTasks]
        res.status(200).json({ status: true, tasks })
    }).catch(err => {
        res.status(403).json({ status: false, err });
    })
}

module.exports = { post, update, remove, get };