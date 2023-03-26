const express = require ("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req,res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);
    const url = "https://us10.api.mailchimp.com/3.0/lists/8117f783e1";
    const options = {
        method: "POST",
        auth: "sourav4u:bd409c98a12d1156b1a7f76ab9ed579-us10"
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data", function(){
            console.log("Working!");
        })
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.listen(process.env.PORT || 3000, function () { 
    console.log("Server is running on Port:3000.");
 });




//  API Key:    cbd409c98a12d1156b1a7f76ab9ed579-us10
// Unique ID:   8117f783e1