const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
var cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const withAuth = require('./middleware')
const fetch = require('node-fetch')

const app = express()
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

const secret = 'mysecretsshhh';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

app.use(function (req, res, next) {

// Website you wish to allow to connect
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/authenticate', (req, res) => {

    fetch('http://localhost:8080/spring-mvc-1/api/students/'+req.body.username+'/')
            .then(response => response.json())
            .then(user => {
                // a simple way i found to check if object is empty, thus meaning no user found
                if(user.username !== undefined) {
                    if(bcrypt.compareSync(req.body.password.toString(), user.password)){
                        if(user.userInformation.activated === 'active') {
                            let username2 = user.username
                            const payload = { username2 }
                            const token = jwt.sign(payload, secret)
                            res.cookie('username', user.username)
                            res.cookie('password', user.password)
                            res.cookie('token', token, { httpOnly: true})
                            res.status(200).send({error: 'boo'})
                        } else {
                            res.status(401).send({error: 'You must be activated by Department Officer!'})
                        }
                    } else {
                        res.status(401).send({error: 'Incorrect Password'})
                    }
                } else {
                    res.status(401).send({error: 'Incorrect Username'})
                }
            })
            .catch(err => console.error(err))

    // old way with using database instead of rest api        
    // User.findOne({
    //     where: {
    //         username: req.body.username
    //     },  
    //     include: [{
    //             model: UserInformation,
    //             where: {activated: 'active'}
    //         }, {
    //             model: Authority,
    //             where: {authority: 'ROLE_STUDENT'}
    //         }, {
    //             model: Application
    //     }]
        
    // })
    //   .then(user => {
    //       if(user) {
    //           if(bcrypt.compareSync(req.body.password.toString(), user.password)) {
    //             let username2 = user.username;
    //             const payload = { username2 };
    //             const token = jwt.sign(payload, secret);
    //             res.cookie('username', user.username);
    //             res.cookie('password', user.password);
    //             res.cookie('token', token, { httpOnly: true}).sendStatus(200);
    //           } else {
    //               res.status(400).json({error: 'Incorrect password'})
    //           }
    //       } else {
    //           res.status(400).json({error: 'User does not exist' })
    //       }
    //   })
    //   .catch(err => {
    //       res.status(400).json({ error: err })
    //   })
})

app.get('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
});

app.get('/logout', withAuth, function(req, res){
    cookie = req.cookies;
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue;
        }    
        res.cookie(prop, '', {expires: new Date(0)});
    }
    res.sendStatus(200)
});

app.listen(4000, function() {
    console.log('Server is running on port 4000')
})