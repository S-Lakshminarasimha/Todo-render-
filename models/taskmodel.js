const mongoose = require('mongoose')

const taskSchema  = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:'userModel',
    }
},{
    timestamps:true
}
)

// const Task = mongoose.model('Task',taskSchema) ---- old

const Not_Started_Tasks = mongoose.model('Not_Started_Tasks',taskSchema)
const In_Progress_Tasks = mongoose.model('In_Progress_Tasks',taskSchema)
const Completed_Tasks = mongoose.model('Completed_Tasks',taskSchema)

// module.exports=Task     --- old

module.exports = {Not_Started_Tasks,In_Progress_Tasks,Completed_Tasks}