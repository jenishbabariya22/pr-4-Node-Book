const { log } = require('console');
const express = require('express');

const port = 6300;

const database = require('./config/database');

const crud = require('./models/crud');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded());




app.get('/', (req, res) => {
    crud.find({}).then((record) => {
        return res.render('index', {
            record
        });
    }).catch((err) => {
        console.log(err);
        return false;
    })

})


app.get('/form', (req, res) => {
    return res.render('form');
})



app.post('/addrecord', (req, res) => {
    let book = req.body.book;
    let price = req.body.price;
    let pages = req.body.pages;
    let author = req.body.author;


    crud.create({ book, price, pages,author})
        .then((record) => {
            return res.redirect('/');
        }).catch((err) => {
            console.log(err);
            return false;
        })

})


  //delet record

app.get('/deleteuser', (req, res) => {
    let delid = req.query.id;
    crud.findByIdAndDelete(delid)
        .then((record) => {
            
            return res.redirect('/');
        }).catch((err) => {
            console.log(err);
            return false;
        })
})


    //edit record

app.get('/edituser',(req,res)=>{
    crud.findById(req.query.id)
    .then((data)=>{
        return res.render('edit',{
            data
        })
    }).catch((err)=>{
        console.log(err);
        return false;
    })
})


   //update record

app.post('/updaterecord',(req,res)=>{
    crud.findByIdAndUpdate(req.body.id,{    
        book : req.body.book,
        price : req.body.price,
        pages : req.body.pages,
        author : req.body.author,

    })
    .then((rec)=>{
        
        return res.redirect('/');
    }).catch((err)=>{
        console.log(err);   
        return false;
    })
})

app.listen(port, (err) => {
    if (err) {
        console.log("server is not started");
        return false;
    }
    console.log(`server start on port :- ${port} `);
})