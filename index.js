const express = require('express')
const app = express()
const port = 3200

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
]

/*app.get(`/test`, (req, res) => {
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
})*/

/////////////////////////////////////////////////////////////////////

app.get(`/movies/create/title/:TITLE?/year/:YEAR?/rating/:RATING?`, (req, res) => {
    const TITLE = req.params.TITLE;
    const YEAR = req.params.YEAR;
    const RATING = req.params.RATING || '4';
    if (TITLE == null || YEAR == null || YEAR.length !== 4 || isNaN(parseInt(YEAR)) ){
        res.status(403).send({status:403, error:true, message:'you cannot create a movie without providing a title and a year'})
    }
    else{
        const new_movie = {title: `${TITLE}`, year: parseInt(YEAR), rating: parseInt(RATING) }
        movies.push(new_movie)
        res.send({status:200, data:movies})
    }
})

app.get(`/movies/read/:SORT?`, (req, res) => {
    const SORT = req.params.SORT;
    if (!SORT){
        res.send({status:200, data:movies }) 
    }
    if (SORT === `by_date`){
        res.send({status:200, data:movies.sort((m1, m2) => (m1.year > m2.year)? 1 : (m1.year < m2.year)? -1 : 0) })
    }
    if (SORT === `by_rating`){
        res.send({status:200, data:movies.sort((m1, m2) => (m1.rating < m2.rating)? 1 : (m1.rating > m2.rating)? -1 : 0) })
    }
    if (SORT === `by_title`){
        res.send({status:200, data:movies.sort((m1, m2) => (m1.title > m2.title)? 1 : (m1.title < m2.title)? -1 : 0) })
    }
})

app.get(`/movies/read/id/:ID?`, (req, res) => {
    const ID = req.params.ID;
    if (isNaN(parseInt(ID)) || movies[ID] == null) {
        res.status(404).send({status:404, error:true, message:`the movie ${ID} does not exist`})
    }
    else {
        res.send({status: 200,data:movies[ID]});
    }
})

app.get(`/movies/update`, (req, res) => {
    res.send({status:200, message:`update`})
})

app.get(`/movies/delete`, (req, res) => {
    res.send({status:200, message:`delete`})
})

app.listen(port, (error) => {
    if (!error){
        console.log(`Example app listening on port ${port}`)
    }
    else{
        console.log("Error occurred, server can't start", error);
    }
})