var express = require('express');
var router= express();
var mainModel = require('../models/main');
var dash = require('../models/dash');

router.get('/', function(request, response) {
response.render('views/enter.html');
});

router.post('/login',function(req,res){
    if(req.body.username!=null){
        
    mainModel.userLogin(req.body.username,function(err,success){
        if (err) {
           res.json("error",err);
        }else{
            res.json("success",success);
        }
    })
    
    }else{
       
         res.status(404).json("Mhh Username cannot be empty")
    }
})

router.get('/users/:user_id/dash', function(req, res) {
    if(req.params.user_id!=null){
        
    dash.getDash(req.params.user_id,function(err,dash){
        if(err){
            res.json(err);
        }else if(dash){         
          res.json(dash);
          
            
        }
    });
    }else{
       // res.json('User id required');
        res.status(404).json('User id required')
    }
 // res.json(req.params.user_id);
});
module.exports = router;  