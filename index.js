const express = require('express');
const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path');
const morgan = require('morgan')
const PORT = 3000;

const app = express();

app.set('view engine', 'ejs');

const db_url = 'mongodb+srv://Dgeko:frGGT14@cluster0.lbrizgf.mongodb.net/?retryWrites=true&w=majority'

const createPath = (page) => path.resolve(__dirname, './views', `${page}.ejs`);

async function startApp() {
    try {
        await mongoose.connect(db_url)
        app.listen(PORT, () => console.log('server started on PORT ' + PORT));
    } catch (error) {
        console.log(error)
    }
}

startApp();

app.use( express.static('views'))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))//  обеспечение для регистрации HTTP-запросов и вывод в терминал

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
    const posts = [
        {
            id: '1', 
            text: 'we a here',
            title: ' title',
            date: '01.01.2022',
            author: 'dgor',
            catName: 'F1',
        },
        {
            id: '2', 
            text: 'we a here2',
            title: ' title2',
            date: '01.02.2022',
            author: 'dgor22',
            catName: 'F2',
        }
    ];
    res.render(createPath('posts'), {title, posts});
});

app.get('/add-post', (req, res) => { // добавляет пост
    const title = 'ADD';
    res.render(createPath('add-post'), {title});
});

app.get('/posts:id', (req, res) => {
    const title = 'Post';
    const post = 
        {
            id: '1', 
            text: 'we a here',
            title: ' title',
            date: '01.01.2022',
            author: 'dgor',
            catName: 'F1',
        };
    res.render(createPath('post'), {title, post});
})