const express = require('express');
const mongoose = require("mongoose");
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const app = express();

const db_url = 'mongodb+srv://Dgeko:frGGT14@cluster0.lbrizgf.mongodb.net/?retryWrites=true&w=majority'

const createPath = (page) => path.resolve(__dirname, './views', `${page}.html`);

async function startApp() {
    try {
        await mongoose.connect(db_url)
        app.listen(PORT, () => console.log('server started on PORT ' + PORT));
    } catch (error) {
        console.log(error)
    }
}

startApp();

app.get('/', (req, res) => { // выдает главную страницу
    const title = 'Home';
    res.sendFile(createPath('base'), {title});
});