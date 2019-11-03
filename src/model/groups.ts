/*const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt-nodejs');*/

const GroupSchema = new Schema({
    // groupID is virtual in the function below this schema

    groupName:{
        type: String,
        required: true
    },
    messages:{
        type:[{
            text: String,
            time_sent: String,
            sender: Number // The userid of the sender
        }],
        required: false // Is this right???
    },
    events:{
        type:[{
            title: String,
            description: String,
            event_date: String,
            location_name: String,
            location_address: String,
            creater: Number, // The userid of the creater
            time_created: String,
        }],
        required: false // Is this right???
    }
})

// Acts as the unique group identifier
GroupSchema.virtual('groupID').get(function() {
    return this._id;
});