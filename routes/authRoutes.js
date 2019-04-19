const passport = require('passport');


module.exports = app => {


  app.get('/auth/goodreads', passport.authenticate('goodreads'));




  app.get('/auth/goodreads/callback', 


    passport.authenticate('goodreads'),


    (req,res) => {
      var envir = process.env.NODE_ENV || 'dev';
  
      var redir = '';

      if(envir != 'dev'){
         redir = '/';
       
      }else{
        redir = 'http://localhost:3000';
      }


      
      res.redirect(redir); //zzz must fix later
    })


  app.get('/auth/logout', (req, res) => {
    
          var envir = process.env.NODE_ENV || 'dev';
      var redir = '';
      if(envir != 'dev'){
        redir = '/';
      }else{
        
         redir = 'http://localhost:3000';
      }


   
      req.logout();
        res.redirect(redir);

  });

  
    app.get('/api/current_user', (req, res) => {

         res.send(req.user);


  });






}