const express = require('express')
const app = express();

// to make sure you send html files with external css files
app.use(express.static(__dirname));
// to make sure you can read psot body.
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req,res) => {
    res.sendFile(__dirname+'/index.html')
})

app.get('/signup', (req,res) => {
    res.sendFile(__dirname+'/signup.html')
})

app.get('/signin', (req,res) => {
    res.sendFile(__dirname+'/signin.html')
})

app.post('/signup', (req,res) => {
    res.write("signed up with folowing details \n");
    res.write(JSON.stringify(req.body));
    res.end();
})

app.post('/signin', (req,res) => {
    res.write("signed in with folowing details \n");
    res.write(JSON.stringify(req.body));
    res.end();
})

app.listen(8000, ()=>{
    console.log(`Serving at http://localhost:8000`);
})