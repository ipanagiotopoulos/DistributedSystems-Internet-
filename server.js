const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
var cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('./models/User')
const UserInformation = require('./models/UserInformation')
const Authority = require('./models/Authority')
const Application = require('./models/Application')
const withAuth = require('./middleware')

User.hasOne(UserInformation, {foreignKey: 'username'});
User.hasOne(Authority, {foreignKey: 'username'});
User.hasOne(Application, {foreignKey: 'username'});

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

app.get('/api/secret', withAuth, function(req, res) {
    res.send('The password is potato');
  });

app.post('/register', (req, res) => {
    const userData = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
        department_name: req.body.department_name
    }

    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if(!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create({ username: userData.username, password: userData.password }).then((user) => {
                        UserInformation.create({ 
                            username: userData.username, 
                            name: userData.name, 
                            email: userData.email,
                            department_name: userData.department_name})
                              .then((userInformation) => {
                              user.setUserInformation(userInformation);
                        });
                    })
                      .then(user => {
                          res.json({status: user.username + 'Registerd!'})
                      })
                      .catch(err => {
                          res.send('error: ' + err)
                      })
                })
            } else {
                res.json({error: 'User alread exists'})
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

app.post('/authenticate', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        },  
        include: [{
                model: UserInformation,
                where: {activated: 'active'}
            }, {
                model: Authority,
                where: {authority: 'ROLE_STUDENT'}
            }, {
                model: Application
        }]
        
    })
      .then(user => {
          if(user) {
              if(bcrypt.compareSync(req.body.password.toString(), user.password)) {
                let username2 = user.username;
                const payload = { username2 };
                const token = jwt.sign(payload, secret);
                res.cookie('username', user.username);
                res.cookie('password', user.password);
                res.cookie('token', token, { httpOnly: true}).sendStatus(200);
              } else {
                  res.status(400).json({error: 'Incorrect password'})
              }
          } else {
              res.status(400).json({error: 'User does not exist' })
          }
      })
      .catch(err => {
          res.status(400).json({ error: err })
      })
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