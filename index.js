const express = require('express')
const app = express()
const port = 3200

app.get('/test', (req, res) => {
  res.json({status:200, message:"ok"})
})

app.get('/time', (req, res) => {
    const TIME = Date().split(' ')[4].split(':')[0]+':'+Date().split(' ')[4].split(':')[1]
    res.json({status:200, message:TIME})
})

app.listen(port, (error) => {
    if (!error){
        console.log(`Example app listening on port ${port}`)
    }
    else{
        console.log("Error occurred, server can't start", error);
    }
})