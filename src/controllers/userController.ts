import {User} from '../model/users'

// This is how you export stuff in typescript (export const <name> = ... )
export const login = function (req:any, res:any, next:any) {
    User.findOne({ email: req.body.email }, function (err:any, user:any) {
        if (err) { return res.status(400).json({ error: "bad data" }); }
        if (!user) { return res.status(400).json({ error: 'Your login details could not be verified. Please try again.' }); }
        user.comparePassword(req.body.password, function (err:any, isMatch:any) {
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
export const register = function(req:any, res:any, next:any){

}

// This edits a usrs profile
export const edit_profile = function(req:any, res:any, next:any){

}

// This deletes a group_id from the users table
export const leave_group = function(req:any, res:any, next:any){

}

// Delete a user from the database
export const delete_user = function(req:any, res:any, next:any){

}