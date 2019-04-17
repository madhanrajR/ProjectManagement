var express = require('express');
var router = express.Router();
var User = require('../models/user.model');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const path = require('path');
var multer = require("multer");
var fs = require("fs");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './profiledp/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });
 
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
 
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

  router.post("/uploadimage/:_userid",upload.single('file'),(req,res,next)=>{      
    const filename = req.file.filename;
    var uid = req.params._userid;
    
    console.log(uid,"ram");  
    console.log(filename)      
    User.findOneAndUpdate({'userID':uid},{$set:{'myimage':filename}},function(err,data){
        if(err)
        console.log(err)
        if(data){
        console.log(data) 
        res.end("file uploaded")      
        }

        if(!data){
            console.log("Not a user")            
            res.end("Not a user");
            return
        }
    //     res.end()
    // res.end("file uploaded")
    })
    
//   res.json({'message': 'File uploaded'});
})


router.get('/getsingleuserdp/:_singleuserid',(req,res,next)=>{
        var userid = req.params._singleuserid
    User.findOne({"userID":userid},function(err,data){
        if(err)
        console.log(err)
        if(data){
            console.log("sriram",data);
            var d = fs.readdirSync("./profiledp/");
            console.log(d)
            fs.readFile('./profiledp/'+data['myimage'],function(err,data){
            if(err){
             console.log("Error",err)
            }
            if(data){
             console.log("file",data)
             res.writeHead(200,{'Content-type':'image/jpeg'});
             res.write(data)
             res.end()
            }
            if(!data){
                console.log("file","File dp is not found")                
                res.end("File dp is not found")
               }
        })
      
    }
    })
    
})


router.post('/signup',(req,res,next)=>{
    console.log("in");
    
    User.find({userID:req.body.userID})
    .exec()
    .then(user =>{
        if(user.length >= 1) {
            return res.status(409).json({
                message: 'UserID exists'
            });
        } else{
            bcrypt.hash(req.body.password,10, (err,hash)=>{
                    if(err){
                        return res.status(500).json({
                            error:err
                        })
                    }else {
                    var user = new User({
                        _id:new mongoose.Types.ObjectId,
                        userID: req.body.userID,
                        password: hash,
                        roles: req.body.roles,
                        username:req.body.username
                })
                user.save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message:'User created'
                    })
                })
                .catch(err =>{
                    console.log(err);
                    res.status(500).json({
                        error: err
                    })
                });
            }
            })
        }
    })
})



router.post("/login",(req,res, next)=>{
    //if(req.body.roles === 'admin'){
    User.find({userID:req.body.userID})
    .exec() 
    .then(user =>{
        console.log(user)
        if(user.length<1) { 
            return res.status(401).json({
                message: 'Auth failed '
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
            if(err) {
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            if(result){
              var token = jwt.sign({
                   // email:user[0].email,
                    userId: user[0]._id
                },"secret",
                {
                    expiresIn: "1h" //"2 days","7d"
                }
                )
                return res.status(200).json({
                    message: user[0].roles,
                    name:user[0].username,
                    userid:user[0].userID,
                    token:token
                })
            }
            res.status(401).json({
                message: 'Auth failed'
            })  
        })
    })
    // }else if(req.body.roles === 'developer'){
    // User.find({userID:req.body.userID})
    // .exec() 
    // .then(user =>{
    //     if(user.length<1) { 
    //         return res.status(401).json({
    //             message: 'Auth failed '
    //         })
    //     }
    //     bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
    //         if(err) {
    //             return res.status(401).json({
    //                 message: 'Auth failed'
    //             })
    //         }
    //         if(result){
    //           var token = jwt.sign({
    //                 email:user[0].email,
    //                 userId: user[0]._id
    //             },"secret",
    //             {
    //                 expiresIn: "1h" //"2 days","7d"
    //             }
    //             )
    //             return res.status(200).json({
    //                 message: 'developer',
    //                 token:token
    //             })
    //         }
    //         res.status(401).json({
    //             message: 'Auth failed'
    //         })  
    //     })
    // })
    // }
})

router.get("/getdeveloperlist",(req,res,next)=>{
    User.find({"roles":"developer"})
    .exec()
    .then(users =>{
        return res.status(200).json({
            message:users
        })
    })
    .catch(err =>{
        return res.status(404).json({
            error:err
        })
    })
})

router.post("/getsingeldeveloper",(req,res,next)=>{
    User.find({"userID":req.body.userID,roles:"developer"})
    .exec()
    .then(users =>{
        return res.status(200).json({
            message:users
        })
    })
    .catch(err =>{
        return res.status(404).json({
            error:err
        })
    })
})

module.exports = router;