const express = require("express");

const bodyParser = require("body-parser");

const https = require('https');

const req = require("request");
const { status, json } = require("express/lib/response");

const app = express();

//in order to serve sttaic page we use

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html")
    console.log(req.statusCode)
    
})

app.post("/",function(req, res){
   const firstname = req.body.fname
   const lastname = req.body.lname
   const email = req.body.mail

   var data = {
       members:[
           {
               email_address :email,
               status:"subscribed",
               merge_feilds:{
                   FNAME:firstname,
                   LNAME:lastname
               }

           }
       ]
   };
   
    const jasondata = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/41659248b7"

    const options ={
        method:"POST",
        auth:"bala:5ff9411a6bc11b4bfa4158bd3f79c843-us14",
    }


    const balac = https.request(url, options, function(response){
        if(response.statusCode == 200){
            res.sendFile(__dirname+"/sucess.html")
        }else{
            res.sendFile(__dirname+"/failure.html")
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
        
       
        
    })
    balac.write(jasondata);
    balac.end();
        
});

app.post("/failure", function(req, res){
    res.redirect("/")
});

port = process.env.PORT || 3000
app.listen(port, function(){
    console.log("serevr started")
})
// 5ff9411a6bc11b4bfa4158bd3f79c843-us14
//list id 41659248b7