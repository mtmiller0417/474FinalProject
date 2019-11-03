// This file only holds basic information for other controller files to use

//declare var require: any; // This "fixes" some error with require. Is this right???

const jwt = require('jsonwebtoken'),
    cryp = require('crypto'),               // was crypto, but gave naming error
    //User = require('../model/user'),
    config = require('../config/config');

function generateToken(user:any) {// Is this right???
    return jwt.sign(user, config.secret, {
        expiresIn: 10080 // in seconds(),168 minutes = 2 hours 8 minutes
    });
}