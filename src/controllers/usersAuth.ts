/*declare var require: any; // This "fixes" some error with require

const jwt = require('jsonwebtoken'),
    cryp = require('crypto'),               // was crypto, but gave naming error
    User = require('../model/user'),
    config = require('../config/config');*/

// Is above already defined once??? 

// This is how you export stuff in typescript (export const <name> = ... )
export const login = function (req, res, next) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { return res.status(400).json({ error: "bad data" }); }
        if (!user) { return res.status(400).json({ error: 'Your login details could not be verified. Please try again.' }); }
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (err) { return res.status(400).json({ error: "bad data" }); }
            if (!isMatch) { return res.status(400).json({ error: 'Your login details could not be verified. Please try again.' }); }

                let userInfo = user.toJson();
                res.status(200).json({
                    token: 'Bearer ' + generateToken(userInfo),
                    user: userInfo
                });
        });
    });
}

// This posts a new user
export const register = function(req, res, next){

}

// This edits a usrs profile
export const edit_profile = function(req, res, next){

}

// This deletes a group_id from the users table
export const leave_group = function(req, res, next){

}