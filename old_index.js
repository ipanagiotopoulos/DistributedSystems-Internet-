var express = require('express')
var cors = require('cors')
const jwt = require('jsonwebtoken')
const passport = require('passport');
const passportJWT = require('passport-jwt')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const withAuth = require('./middleware');
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

let ExtractJwt = passportJWT.ExtractJwt;

let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'djdosf';

const User = require('./Models/User')
const UserInformation = require('./Models/UserInformation')
const Authority = require('./Models/Authority')
const Application = require('./Models/Application')

User.hasOne(UserInformation, {foreignKey: 'username'});
User.hasOne(Authority, {foreignKey: 'username'});
User.hasOne(Application, {foreignKey: 'username'});

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let user = getUser({ username: jwt_payload.username });
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
});

passport.use(strategy);

const getAllUsers = async () => {
    return await User.findAll(
        {
        include: [{
            model: UserInformation,
        }, {
            model: Authority,
            where: {authority: 'ROLE_STUDENT'}
        }, {
            model: Application
        }]
    });
};

const getUser = async obj => {
    return await User.findOne({
        where: obj,
        include: [{
            model: UserInformation,
        }, {
            model: Authority,
            where: {authority: 'ROLE_STUDENT'}
        }, {
            model: Application
        }]
    }
    );
};

app.get('/list', function(req, res) {
    getAllUsers().then(user => res.json(user)); 
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
            }, {
                model: Authority,
                where: {authority: 'ROLE_STUDENT'}
            }, {
                model: Application
        }]
        
    })
      .then(user => {
          if(user) {
              if (bcrypt.compareSync(req.body.password, user.password)) {
                let payload = { username: user.username };
                let token = jwt.sign(payload, jwtOptions.secretOrKey);
                res.cookie('token', token, { hhtpOnly: true })
                  .sendStatus(200);
                res.json({ msg: 'ok', token: token });
                //   let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                //       expiresIn: 1440
                //   })
                //   res.send(token)
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

app.get('/', withAuth, function(req, res) {
    res.json('Success! You can now see this without a token.');
});

// users.get('/', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), function(req, res) {
//     res.json('Success! You can now see this without a token.');
// });



// users.get('/profile', (req, res) => {
//     var decoded = jwt.verify(req.headers['Authorization'], process.env.SECRET_KEY)

//     User.findOne({
//         where: {
//             id: decoded.id
//         }
//     })
//       .then(user => {
//           if(user) {
//             res.json(user)
//           } else {
//               res.send('User does not exist')
//           }
//       })
//       .catch(err => {
//           res.send('error: ' + err)
//       })
// })

app.listen(4000, function() {
  console.log('Server is running on port 4000')
})