const express = require('express');
const app=express();
app.get('/', (req, res)=>{
    res.json({success: true , messsage : "Welcome to backend !"})
});
app.listen(8080 , ()=>{
    console.log('port 8080 is listening')
});
module.exports = app;
