const passport = require('passport');


module.exports = app => {


  app.get('/auth/goodreads', passport.authenticate('goodreads'));




  app.get('/auth/goodreads/callback', 


    passport.authenticate('goodreads'),


    (req,res) => {

      //console.log('goodreadscallback');
      res.redirect('/'); //zzz must fix later
    })


  app.get('/auth/logout', (req, res) => {
    
      //console.log('logged out');
      req.logout();
        res.redirect('/');

  });

  
    app.get('/api/current_user', (req, res) => {

      //console.log(req.user+'currentuser')
         res.send(req.user);


  });






}