// const Task = require('../models/taskmodel')  -- old
const { ObjectId } = require("mongodb"); // Add this line to import ObjectId

const {Not_Started_Tasks,In_Progress_Tasks,Completed_Tasks} = require('../models/taskmodel')


// Adding Task to the database
module.exports.createTask = function(req,res){
    Not_Started_Tasks.create({
        content:req.body.content,
        user:req.user._id
    },function(err,task){
        if(err){
            return console.log("Error posting task to db")
        }
        return res.redirect('back')
    })
}


//Deleting Task from the database
module.exports.deleteTask=function(req,res){
    task_id = req.params.task_id
    zone = req.params.zone
    

    if (zone=='notstarted'){
        Not_Started_Tasks.findByIdAndDelete({_id:task_id},function(err){
            if(err){
                return console.log("error deleting user")
            }
            return res.redirect('back')
        })
    }
    else if (zone=='inprogress'){
        In_Progress_Tasks.findByIdAndDelete({_id:task_id},function(err){
            if(err){
                return console.log("error deleting user")
            }
            return res.redirect('back')
        })
    }
    else if (zone=='completed'){
        Completed_Tasks.findByIdAndDelete({_id:task_id},function(err){
            if(err){
                return console.log("error deleting user")
            }
            return res.redirect('back')
        })
    }
    
    
}




module.exports.moveData = function(req,res){
    const task_id = req.params.task_id
    const dst_zone = req.params.dst_zone;
    const cur_zone = req.params.cur_zone
    console.log(cur_zone,task_id,dst_zone)

    if (dst_zone == "notstarted"){
        if (cur_zone == "inprogress"){
            In_Progress_Tasks.findOne({_id:task_id},(err,task,next)=>{
                // adding task to dst zone
                Not_Started_Tasks.create({_id: new ObjectId(task_id),content:task.content,user:task.user._id,},
                    (err,task)=>{
                    if(err){
                        return console.log(err)
                    }
                })
                In_Progress_Tasks.findByIdAndDelete({_id:task_id},function(err){
                    if(err){
                        return console.log("error deleting user")
                    }
                    return res.redirect('back')
                })
            })
        }
        if(cur_zone == "completed"){
            Completed_Tasks.findOne({_id:task_id},(err,task,next)=>{
                // adding task to dst zone
                Not_Started_Tasks.create({_id: new ObjectId(task_id),content:task.content,user:task.user._id},
                    (err,task)=>{
                    if(err){
                        return console.log(err)
                    }

                })
                Completed_Tasks.findByIdAndDelete({_id:task_id},function(err){
                    if(err){
                        return console.log("error deleting user")
                    }
                    return res.redirect('back')
                })
            })
        }
    }
    else if (dst_zone == "inprogress"){
        if (cur_zone == "notstarted"){
            Not_Started_Tasks.findOne({_id:task_id},(err,task,next)=>{
                // adding task to dst zone
                In_Progress_Tasks.create({_id: new ObjectId(task_id),content:task.content,user:task.user._id},
                    (err,task)=>{
                    if(err){
                        return console.log(err)
                    }
                })
                Not_Started_Tasks.findByIdAndDelete({_id:task_id},function(err){
                    if(err){
                        return console.log("error deleting user")
                    }
                    return res.redirect('back')
                })
            })
        }
        if(cur_zone == "completed"){
            Completed_Tasks.findOne({_id:task_id},(err,task,next)=>{
                // adding task to dst zone
                In_Progress_Tasks.create({_id: new ObjectId(task_id),content:task.content,user:task.user._id},
                    (err,task)=>{
                    if(err){
                        return console.log(err)
                    }
                })
                Completed_Tasks.findByIdAndDelete({_id:task_id},function(err){
                    if(err){
                        return console.log("error deleting user")
                    }
                    return res.redirect('back')
                })
            })            
        }
    }
    else if (dst_zone == "completed"){
        if (cur_zone == "notstarted"){
            Not_Started_Tasks.findOne({_id:task_id},(err,task,next)=>{
                // adding task to dst zone
                Completed_Tasks.create({_id: new ObjectId(task_id),content:task.content,user:task.user._id},
                    (err,task)=>{
                    if(err){
                        return console.log(err)
                    }
                })
                Not_Started_Tasks.findByIdAndDelete({_id:task_id},function(err){
                    if(err){
                        return console.log("error deleting user")
                    }
                    return res.redirect('back')
                })
            })
        }   
        if(cur_zone == "inprogress"){
            In_Progress_Tasks.findOne({_id:task_id},(err,task,next)=>{
                // adding task to dst zone
                Completed_Tasks.create({_id: new ObjectId(task_id),content:task.content,user:task.user._id},
                    (err,task)=>{
                    if(err){
                        return console.log(err)
                    }
                })
                In_Progress_Tasks.findByIdAndDelete({_id:task_id},function(err){
                    if(err){
                        return console.log("error deleting user")
                    }
                    return res.redirect('back')
                })
            })
        }
        
    }

}
