const express = require('express')
const app = express();
const jwt = require('jsonwebtoken');
let users = []

// to make sure you send html files with external css files
app.use(express.static(__dirname));
// to make sure you can read psot body.
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req,res) => {
    res.sendFile(__dirname+'/index.html')
})

app.get('/users', (req,res) => {
    res.send(users);
})

app.get('/signup', (req,res) => {
    res.sendFile(__dirname+'/signup.html')
})

app.get('/signin', (req,res) => {
    res.sendFile(__dirname+'/signin.html')
})

app.post('/signup', (req,res) => {
    req.body.psw = jwt.sign(req.body.psw , 'secret');
    delete req.body["psw-repeat"];
    users.push(req.body);
    res.write("signed up with folowing details \n");
    res.write(JSON.stringify(req.body));
    res.end();
})

app.post('/signin', (req,res) => {
    req.body.psw = jwt.sign(req.body.psw , 'secret');
    const userExists = users.find(el=> el.email == req.body.uname && el.psw == req.body.psw);
    if(!userExists){
        return res.status(401).send("Username or password is wrong \n");
    }
    res.write("signed in with folowing details \n");
    res.write(JSON.stringify(userExists));
    res.status(200).end();
})

app.listen(8000, ()=>{
    console.log(`Serving at http://localhost:8000`);
})