const express = require('express')
const mongoose=require('mongoose')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
// Data base

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });


    app.post('/', function (req, res) {  
        var name=req.body
        
        mongoose.connect("mongodb://localhost:27017/", function (err,db) {
    if(!err)
    console.log('success');  
    db.collection("List").insertOne(name, function(err, res){
        if (err);
        console.log(err);
        db.close();
    }); 
    });
 res.send('data inserted')
});
//*************update*********** */

app.post('/up', function (req, res) {  
    var name=req.body[0]
    console.log('name'+name)
    var newname= {$set: req.body[1]}
    console.log('new name'+newname)
    mongoose.connect("mongodb://localhost:27017/", function (err,db) {
if(!err)
console.log('success');  
db.collection("List").updateOne(name,newname, function(err, res){
    if (err);
    console.log(err);
    console.log("updated data in mongo");
    db.close();
}); 
});
res.send('data updated')
});
 
//##################### Getdata
app.get('/', (req, res) => { 
   
    mongoose.connect("mongodb://localhost:27017/", function (err,db) {
if(!err)
console.log('success');  
db.collection("List").find({}).toArray(function(err, result) {
    if (err);
    console.log(err);
    res.send(result)
    db.close();
}); 
});
  
})
// ################### delete data
app.delete('/', (req, res) => {   
    var name=req.body
        
    mongoose.connect("mongodb://localhost:27017/", function (err,db) {
if(!err)
console.log('success');  
db.collection("List").deleteOne(name, function(err, res){
    if (err);
    console.log(err);
    console.log("1 document deleted");
    db.close();
}); 
});
res.send('data deleted')
})


app.listen(5000, () => {
  console.log(`Example app listening at http://localhost:5000`)
})