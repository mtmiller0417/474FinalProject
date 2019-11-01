const AuthenticationController = require('./controllers/authentication'),  
      express = require('express'),
      passportService = require('./security/passport');
     
module.exports = function(app) {  
    // Initializing route groups
    const apiRoutes = express.Router(),
            authRoutes = express.Router(),
            otherRoutes = express.Router();

    apiRoutes.use('/auth', authRoutes);
    // /api/auth/register
    authRoutes.post('/register', AuthenticationController.register);
    // /api/auth/login
    authRoutes.post('/login', AuthenticationController.login);
    // /api/auth/authorize
    authRoutes.get('/authorize',passportService.requireAuth,AuthenticationController.authorize);



    otherRoutes.get('/info',passportService.requireAuth,function(req,res,next){
        res.json({user: req.user.toJson()})});
    apiRoutes.use('/stuff',otherRoutes);


    app.use('/api', apiRoutes);
};

/* const apiRoutes = express.Router(),
         userRouters = express.Router(),
         groupRouters = express.Router()

    apiRoutes.use('/users',userRoutes)
    // /api/users/register
    userRoutes.post('/register')

    apiRoutes.use('/groups',groupRoutes)
    // /api/groups/make_group
    groupRoutes.post('/make_group')

    app.use('/api', apiRoutes);
*/