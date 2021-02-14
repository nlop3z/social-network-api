const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const UserSchema = new Schema({
    username: { 
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^([a-z0-9_\.-]+)@([a-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address.']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        // getters: true
    },
    id: false
}
);


//gets the total count of friends
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

//gets the total count of thoughts
UserSchema.virtual('thoughtCount').get(function() {
    return this.thoughts.reduce((total, thought) => total + thought.reactions.length + 1, 0);
});


//creates the User model using UserSchema 
const User = model('User', UserSchema);

//exports the User model
module.exports = User;