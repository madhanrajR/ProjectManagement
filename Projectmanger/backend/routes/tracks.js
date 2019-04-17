var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const checkAuth = require('../middleware/check-auth');

var User = require('../models/user.model');
var Project = require('../models/project.model');
var TrackProject = require('../models/track.model');


router.get("/",(req,res,next) =>{
    TrackProject.find()
        // .populate({'user':'userID','user':'roles'})
        // .populate('user','userID')
        // // .select()
        // .populate('project','projectID')
        // // .select()
        .exec()
        .then(docs =>{
            res.status(200).json({
                count: docs.length,
                trackProjects: docs.map(doc => {
                  return {
                    // _id: doc._id,
                    user: doc.user,
                    project:doc.project,
                    recorddate: doc.recorddate,
                    userDescription: doc.userDescription,
                    // request: {
                    //   type: "GET",
                    //   url: "http://localhost:3000/orders/" + doc._id
                    // }
                  };
                })
            });
        })
        .catch(err =>{
            res.status(500).json({
                error:err
            })
        })
})

// router.post("/checkandupdate",(req,res,next) =>{
//     TrackProject.find({"userID":req.body.userID,"projectID":req.body.projectID})


//     User.findOne({"userID":req.body.userID})
//     .then(user => {
//         if(!user) {
//             return res.status(404).json({
//                 message: "user not found"
//             });
//         } else {
//             Project.findOne({"projectID":req.body.projectID})
//             .then(project => {
//                 if(!project) {
//                     return res.status(404).json({
//                         message: "Project not found"
//                     });
//                 } else{
//                     var epoch1 = new Date().getTime();
//                     var cdate = new Date(epoch1).toLocaleDateString();
//                     TrackProject.findOne({"recorddate":cdate})
//                     if(!data)
//                     {
//                         return res.status(404).json({
//                         message: "Project not found"   
//                     }
//                 } else{
//                     return new TrackProject({
//                         _id: mongoose.Types.ObjectId(),
//                         recorddate: cdate,
//                         userDescription: req.body.userDescription,
//                         user: user.userID,
//                         project: project.projectID
//                     }).save();
 
//                 }
//             })
//             .then(result =>{
//                 console.log(result +"result");
//                 res.status(201).json({
//                     message: result
//                 })
//             })
//             .catch(err => {
//                 console.log("error in db"+err);
//                 res.status(500).json({
//                   error: err
//                 });
//             });
//         }
//     })
   
//         // .populate({'user':'userID','user':'roles'})
//         // .populate('user','userID')
//         // // .select()
//         // .populate('project','projectID')
//         // // .select()
//         .exec()
//         .then(docs =>{
//             res.status(200).json({
//                 count: docs.length,
//                 trackProjects: docs.map(doc => {
//                   return {
//                     // _id: doc._id,
//                     user: doc.user,
//                     project:doc.project,
//                     recorddate: doc.recorddate,
//                     userDescription: doc.userDescription,
//                     // request: {
//                     //   type: "GET",
//                     //   url: "http://localhost:3000/orders/" + doc._id
//                     // }
//                   };
//                 })
//             });
//         })
//         .catch(err =>{
//             res.status(500).json({
//                 error:err
//             })
//         })
// })


router.post("/newTrack",(req,res,next) => {
var mycurrentdate = new Date(); 
var mytodaydate = mycurrentdate.toLocaleString().split(',')[0]

    TrackProject.find({"user":req.body.user,"project":req.body.project,"date": mytodaydate },function(err,data){
        if(err){
            console.log(err,"find err")

        }   
        console.log(data.length)
        var count=data.length;
        console.log(count==0)
        if(count==0){ 
            
            console.log("NoRecords found")
            res.json({message:"False","data":"No data found"})
            res.end();
             
            
        }
        else{
            console.log("record found")           
           res.json({message:"True","data":data})
            res.end() 
        }
    })


    // var lasttime;
    // var refdate = new Date();
    // var refdate2 = refdate.toLocaleString()
    // var epoch1 = new Date().getTime();
    // var epoch = parseInt(epoch1/1000);
    // var starttime = "00:00:00";
    // var endtime = "23:59:59";
    // var cdate = new Date(epoch1).toLocaleDateString();
    // var a = cdate+" "+endtime;
    // var b = cdate+" "+starttime;
    // var concatendtime = new Date(a);
    // var concatstarttime = new Date(b);
    // var newendtime = concatendtime.getTime()/1000;
    // var newstarttime = concatstarttime.getTime()/1000;
    // User.findOne({"userID":req.body.user})
    // .then(user => {
    //     if(!user) {
    //         return res.status(404).json({
    //             message: "user not found"
    //         });
    //     } else {
    //         Project.findOne({"projectID":req.body.project})
    //         .then(project => {
    //             if(!project) {
    //                 return res.status(404).json({
    //                     message: "Project not found"
    //                 });
    //             } else{
    //                 TrackProject.find({"user":req.body.user},{"project":req.body.project},function(err,data){
    //                     if(err){
    //                         console.log(err,"ramerr")
    //                     }
    //                     if(data){
    //                         console.log(data,"")
    //                     }
    //                 })
    //                 // return new TrackProject({
    //                 //     _id: mongoose.Types.ObjectId(),
    //                 //     recorddate: epoch,
    //                 //     userDescription: req.body.userDescription,
    //                 //     user: user.userID,
    //                 //     date:refdate2,
    //                 //     project: project.projectID
    //                 // }).save();
 
    //             }
    //         })
    //         .then(result =>{
    //             console.log(result +"result");
    //             res.status(201).json({
    //                 message: result
    //             })
    //         })
    //         .catch(err => {
    //             console.log("error in db"+err);
    //             res.status(500).json({
    //               error: err
    //             });
    //         });
    //     }
    // })
 });

//  router.post("/newtracksave",(req,res,next) =>{

    
    
//  })

 router.post("/newtracksave",(req,res) =>{
    var mycurrentdate = new Date(); 
    var mytodaydate = mycurrentdate.toLocaleString().split(',')[0]

    var proId = req.body.projectID;
    var useId = req.body.userID;
    var workhours = req.body.recorddate;
    var descrip = req.body.userDescription;
    var newdate = mytodaydate;
    console.log(req.body);
    

        return new TrackProject({
            _id: mongoose.Types.ObjectId(),
            user :useId,
            project :proId,
            recorddate : workhours,
            userDescription : descrip,
            date : newdate
                    }).save()
            .then(result =>{
                console.log(result +"result");
                res.status(201).json({
                    message: result
                })
            })
            .catch(err => {
                console.log("error in db"+err);
                res.status(500).json({
                  error: err
                });
            });
   
})


router.post("/newtrackupdate/:_id",(req,res,next) =>{

    TrackProject.findByIdAndUpdate({_id:req.params._id},{$set:{"recorddate":req.body.recorddate,"userDescription":req.body.userDescription}})
    .then(data => {
        res.status(201).json({
            message: data
        })
    })
    .catch(err =>{
        console.log(err in db);_id
        res.status(500).json({
            error:err
        })
    })
})
// user to multi project
router.get("/userproject/:_id",(req,res,next) =>{
    TrackProject.find({"project":req.params._id})      
        .exec()
        .then(docs =>{
            res.status(200).json({
                count: docs.length,
                trackProjects: docs.map(doc => {
                  return {
                  doc
                  };
                })
            });
        })
        .catch(err =>{
            res.status(500).json({
                error:err
            })
        })
})

// one project to multi user
router.post("/no_of_users_in_project",(req,res,next) =>{
    TrackProject.find({"user":req.body.userid,"project":req.body.projectid})      
        .exec()
        .then(docs =>{
            res.status(200).json({
                count: docs.length,
                trackProjects: docs.map(doc => {
                  return {
                  doc
                  };
                })
            });
        })
        .catch(err =>{
            res.status(500).json({
                error:err
            })
        })
})

module.exports = router;