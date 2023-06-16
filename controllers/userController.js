const User = require('../models/userModel')

// rendering Signup page
module.exports.Signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/profile')
    }
    return res.render('Signup')
}

//rendering Login Page
module.exports.Login = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/profile')
    }
    return res.render('Login')
}

// Logging off the user
module.exports.Logout = function(req,res,next){
    req.logout(function(err){
        if(err){
            return next(err)
        }
        return res.redirect('/')
        
    })
    res.clearCookie("USER",{path:'/'})
}

// create Account for user
module.exports.createAccount = function(req,res){
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            return console.log("Error finding user !!",err)
        }

        if (!user){
            User.create({
                username:req.body.username,
                email:req.body.email,
                password:req.body.password
            })
            return res.redirect('/login')
        }
        return res.redirect('/login')
    })
}

// Establishing session for user after authentication
module.exports.createSession = function(req,res){
    res.redirect('/login/profile')
}


// rendering Profile Page to the user

// const Task = require('../models/taskmodel')  ---old

const {Not_Started_Tasks,In_Progress_Tasks,Completed_Tasks} = require('../models/taskmodel')


// module.exports.profile = function(req,res){
//     Task.find({user:req.user._id},function(err,task){             //remember the populat if you want to display the user details also
//         if(err){                                                             // syntax : Task.find({}).populate('user').exec(function returned in left code)
//             return console.log("error displaying data",err)
//         }
//         return res.render('Profile', {Task:task})
//     })   
    
// }

module.exports.profile = function(req, res) {
    const userTasks = {};
  
    const notStartedTaskPromise = Not_Started_Tasks.find({ user: req.user._id }).exec();
    const inProgressTaskPromise = In_Progress_Tasks.find({ user: req.user._id }).exec();
    const completedTaskPromise = Completed_Tasks.find({ user: req.user._id }).exec();
  
    Promise.all([notStartedTaskPromise, inProgressTaskPromise, completedTaskPromise])
      .then(([notStartedTasks, inProgressTasks, completedTasks]) => {
        userTasks.Not_Started_Task = notStartedTasks;
        userTasks.In_Progress_Task = inProgressTasks;
        userTasks.Completed_Task = completedTasks;
  
        res.render('Profile', { userTasks });
      })
      .catch(err => {
        console.log("Error displaying data:", err);
        res.status(500).send('Internal Server Error');
      });
  };



