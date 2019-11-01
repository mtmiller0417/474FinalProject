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
    apiRoutes.use('/groups',groupRoutes)

    // GET

    userRoutes.get('/'); // Get all users      ???
    groupRoutes.get('/') // Get all groups     ???
    userRoutes.get('/user_id') // Get a specific user info
    groupRoutes.get('/group_id') // Get specific user info
    userRoutes.get('/group_id') // Get all the groups a user belongs to

    // POST

    userRoutes.post('/'); // Create a new user
    groupRoutes.post('/'); // Create a new group
    groupRoutes.post('/messages'); // Create a new message
    groupRoutes.post('/events'); // Create a new event

    // PUT

    userRoutes.put('/user_id'); // Edit a users account
    groupRoutes.put('/messages'); // Edit a message
    groupRoutes.put('/events'); // Edit an event

    // DELETE

    userRoutes.delete('/user_id') // Delete a specific user
    groupRoutes.delete('/group_id') //Delete a specific group
    userRoutes.delete('/group_id') // Delete a group that a user belongs to
    groupRoutes.delete('/event') // Deletes an event in a group


    // /api/users/register
    userRoutes.post('/', AuthenticationController.createUser)

    apiRoutes.use('/groups',groupRoutes)
    // /api/groups/make_group
    groupRoutes.post('/make_group')

    app.use('/api', apiRoutes);
*/