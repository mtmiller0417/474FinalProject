const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    first_name: {
        type: String,
        lowercase: true,
        required: true
    },
    last_name: {
        type: String,
        lowercase: true,
        required: true
    },
    username:{
        type: String, 
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    bio:{
        type: String,
        required: false
    }, 
    groupIDs:{
        type: [Number], // An array of numbers
        required: false // User doesnt have to belong to any group, correct?
    },
    // Perhaps dont use this one at first
    profile_picture:{ 
        type: Buffer,
        required: false
    }
});

// Acts as the unique user identifier
UserSchema.virtual('userID').get(function() {
    return this._id;
});

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', function (next:any) {
  const user = this,
    SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function (err:any, salt:any) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function (err:any, hash:any) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword:any, cb:any) {
  if (this.password==='*') {cb(null,false);return;}
  bcrypt.compare(candidatePassword, this.password, function (err:any, isMatch:any) {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
}

UserSchema.methods.toJson = function () {
  return {
    _id: this._id,
    firstName: this.profile.firstName,
    lastName: this.profile.lastName,
    email: this.email,
    role: this.role,
    provider: this.provider
  }
}
module.exports = mongoose.model('User', UserSchema);

export var User = mongoose.model('User', UserSchema)
