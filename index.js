const express = require('express')
const app = express()
const port = 3200

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
]

app.get(`/test`, (req, res) => {
  res.json({status:200, message:`ok`})
})

app.get(`/time`, (req, res) => {
    const TIME = Date().split(' ')[4].split(':')[0]+':'+Date().split(' ')[4].split(':')[1]
    res.json({status:200, message:TIME})
})

app.get(`/hello/:ID?`, (req, res) => {
    const ID = req.params.ID || 'Guest';
    res.json({status:200, message:`Hello, ${ID}`})
})

app.get('/search', (req, res) => {
    const SEARCH = req.query.s;
    if (SEARCH) {
        res.json({status: 200,message: "ok", data: SEARCH})
    }
    else {
        res.status(500).json({status: 500,error: true,message: "you have to provide a search"})
    }
})

/////////////////////////////////////////////////////////////////////

app.get(`/movies/create`, (req, res) => {
    res.json({status:200, message:`create`})
})

app.get(`/movies/read`, (req, res) => {
    res.json({status:200, data:movies })
})

app.get(`/movies/update`, (req, res) => {
    res.json({status:200, message:`update`})
})

app.get(`/movies/delete`, (req, res) => {
    res.json({status:200, message:`delete`})
})

app.listen(port, (error) => {
    if (!error){
        console.log(`Example app listening on port ${port}`)
    }
    else{
        console.log("Error occurred, server can't start", error);
    }
})