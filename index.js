const express = require('express');
const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const Driver = require('./models/driver.js');
const Recaptcha = require('express-recaptcha').RecaptchaV3;

const recaptcha = new Recaptcha('SITE_KEY', 'SECRET_KEY', { callback: 'cb' })


const PORT = 3000;

const app = express();

app.set('view engine', 'ejs');

const db_url = 'mongodb+srv://Dgeko:frGGT14@cluster0.lbrizgf.mongodb.net/racers?retryWrites=true&w=majority'

const createPath = (page) => path.resolve(__dirname, './views', `${page}.ejs`);

async function startApp() {
    try {
        await mongoose.connect(db_url);
        console.log('connected to DB');
        app.listen(PORT, () => console.log('server started on PORT ' + PORT));
    } catch (error) {
        console.log(error);
    }
}

startApp();

app.use( express.static('views'))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))//  обеспечение для регистрации HTTP-запросов и вывод в терминал

app.use(express.urlencoded({extended: false}))// анализирует входящие запросы, небходим для обработки Post запроса мне

app.get('/', (req, res) => { // выдает главную страницу
    const title = 'Home';
    res.render(createPath('base'), {title});
});

app.get('/contacts', (req, res) => { // выдает главную контактов
    const title = 'contacts';
    res.render(createPath('contacts'), {title});
});

app.get('/posts', (req, res) => { // выдает главную постов
    const title = 'Formula';
    Driver
        .find()
        .then((posts) => res.render(createPath('posts'), {posts, title}))
        .catch((e) => {
            console.log(e);
            res.render(createPath('error'), )
        })
});

app.get('/add-post', (req, res) => { // добавляет пост
    const title = 'ADD';
    res.render(createPath('add-post'), {title});
});

app.get('/posts/:id', (req, res) => {
    const title = 'Post';
    const post = 
        {
            id: '1', 
            text: 'we a here',
            title: 'first',
            date: '01.01.2022',
            author: 'dgor',
            catName: 'F1',
        };
    res.render(createPath('post'), {post, title});
});

app.post('/add-post', (req, res) => {
    recaptcha.verify(req, (error, data) => {
        if (!error) {
            const { title, author, text, category} = data.body;
            const post = new Driver({title, author, text, category});
            post
                .save()
                .then((result) => res.send(result))
                .catch((e) => {
                    console.log(e);
                    res.render(createPath('error'), )
                })
            } 
})
});