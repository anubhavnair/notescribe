
// For using .env file data
require('dotenv').config();
const express = require("express");
const path = require('path');
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT_NO || 3000;


app.get('/', (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        // console.log(files);
        res.render('index', { files: files });
    })
})
app.get('/file/:filename', (req, res) => {
    const { filename } = req.params;
    fs.readFile(`./files/${filename}`, 'utf8', (err, data) => {
        if (err) {
            res.send("File Not Found");
        } else {

            res.render("show", { filename: filename, data: data })
        }
    })

})
app.post('/create', (req, res) => {

    fs.writeFile(`./files/${req.body.title.split(' ').join('_')}.txt`, req.body.note_desc, (err) => {
        res.redirect("/");
    })

})
app.get('/file/delete/:filename', (req, res) => {

    fs.unlink(`./files/${req.params.filename}`, (err) => {
        res.redirect("/");
    })

})
app.use((req, res, next) => {
   res.render('page_not_found')
});

app.listen(PORT, () => {
    console.log(`Server is Running  at port NO ${PORT}`);
})
