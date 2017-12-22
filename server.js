var express = require('express');
var bodyparser= require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var session = require('express-session');
var flash=require('connect-flash');
var app = express();
var sch = require('./models/sched');
var passport = require('passport');
app.locals.moment = require('moment');
var router = express.Router();

app.use(bodyparser.urlencoded({ extended: true }));
// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
require('./passport')(passport);
app.use(session({
  secret: 'keyboard cat'
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());


mongoose.connect('mongodb://user1:Rhapsody123@ds064799.mlab.com:64799/testmongo1');
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected bro');
});

  // Use connect-flash middleware.  This will add a `req.flash()` function to
  // all requests, matching the functionality offered in Express 2.x.
router.use('/logout', function(req, res) {
        req.logout();
        if (!req.user) 
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.redirect('/');
    });
router.get('/', function(req, res){
  res.render('index');
});

router.post('/submit-data', function(req,res){
    var newSch = sch();
   
    newSch.username = req.user.username;
    newSch.pikupdate = req.body.apptdate;
    
    newSch.pikuptime = req.body.slot;
    newSch.save(function(err) {
                    if (err)
                        throw err;
                    else {req.session.name='t';}
                });
    res.render('profile',{ user : req.user, // get the user out of session and pass to template
            msg: 'Updated'});
})
router.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
router.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));
        

router.get('/login', function(req, res){
    if(!req.user){
  res.render('login',{message:req.flash('loginMessage')});}
  else {res.redirect(req.session.prevUrl);}
});

router.post('/login', passport.authenticate('login',{
  successRedirect:'/profile',
  failureRedirect:'/login'
}));

router.get('/register', function(req, res){
  res.render('register',{message:req.flash('signupMessage')});
});

router.post('/register', passport.authenticate('signup',{
  successRedirect:'/profile',
  failureRedirect:'/register'
}));

router.get('/profile', isLoggedIn, function(req, res) {
    req.session.prevUrl='/profile';
    res.render('profile', {
            user : req.user, // get the user out of session and pass to template
            msg: 'Please add the details to update'
        });
       
    
    
    });
router.get('/get-data', function(req, res) {
    console.log(req.user.username);
    sch.find({ 'username': req.user.username }, function (err, sch1) { 
if(!err)
  //res.send("Day :" + sch1[i].pikupday + 'user: ' + req.user.username + 'Time:'+sch1[i].pikuptime + 'Date:'+sch1[i].pikupdate) // Space Ghost is a talk show host.
  
  res.render('data-sched', {respdata:sch1, user:req.user});
})});


   

    // =====================================
    // LOGOUT ==============================
    // =====================================
    


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


app.use('/',router);



app.listen(process.env.PORT, process.env.IP);