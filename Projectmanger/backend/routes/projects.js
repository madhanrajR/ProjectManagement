var express = require('express');
var router = express.Router();
var Project = require('../models/project.model');
var mongoose = require('mongoose');
var checkAuth = require('../middleware/check-auth');

router.get("/",(req,res,next)=>{
    Project.find()
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            projects: docs.map(doc => {
              return {
                projectID: doc.projectID,
                projectTitle: doc.projectTitle,
                projectDescription: doc.projectDescription,
                _id: doc._id,
                request: {
                  type: "GET",
                  url: "http://localhost:3000/products/" + doc._id
                }
              };
            })  
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
})




router.post('/newproject',(req,res,next)=>{
    // if()
    var project = new Project({
        _id: new mongoose.Types.ObjectId(),
        projectID: req.body.projectID,
        projectTitle:req.body.projectTitle,
        projectDescription: req.body.projectDescription
    });
    project
        .save()
        .then(result => {
            res.status(201).json({
                message:"New project added",
                createdProject:{
                    projectID: result.projectID,
                    projectTitle: result.projectTitle,
                    projectDescription: result.projectDescription,
                    _id: result._id,
                    request:{
                        type: 'GET',
                        url: "http://localhost:3000/api/project/"+result._id
                    }
                }
            });
        })
        .catch(err =>{
            console.log(err);
           res.status(500).json({
               error: err
           }) 
        })
})


router.get("/:projectId",(req,res,next) =>{
    const id = req.params.projectId;
    Project.findById(id)
    .exec()
    .then(doc =>{
        console.log("From database",doc);
        if(doc){
            res.status(200).json({
                project: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/api/project'
                }
            })
        }else {
            res.status(404)
            .json({
                message:"No valid entry found for provided ID"
            })
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err});
    })
})


module.exports = router;