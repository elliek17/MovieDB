const express = require('express')
const app = express()
const port = 3200

app.get('/*', (req, res) => {
  res.send('ok')
})



app.listen(port, (error) => {
    if (!error){
        console.log(`Example app listening on port ${port}`)
    }
    else{
        console.log("Error occurred, server can't start", error);
    }
})