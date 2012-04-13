module.exports = function(mongoose) {

    var config      = require('../config/config')(),
        logger      = require('./logger'),
        helper      = require('./helper'),
        Schema      = mongoose.Schema,
        ObjectId    = Schema.ObjectId,
        Signup;

    
    // Comment - is an embedded document for BlogPost
    Comments = new Schema({
      name      : String
    , text      : String
    , date      : { type: Date, default: Date.now }
    });
    
    // BlogPost - 
    var BlogPost = new Schema({
      title     : String
    , urlslug   : String
    , content   : String
    , date      : { type: Date, default: Date.now }
    , comments  : [Comments]
    , author      : {
        name : String
        , email  : String
      }
    });

    // add schemas to Mongoose
    mongoose.model('BlogPost', BlogPost);
    mongoose.model('Comment', Comments);

};





    
    Signup = new Schema({
          id    : { type : ObjectId },
        email : { type: String, required: true, trim: true, unique: true, validate: [helper.isEmail, 'email invalid'] },
        name  : { type: String, required: true, trim: true },
        pic   : { type: String, required: true, trim: true },
        date  : { type: Date, required: true, default: Date.now }
    });

    Signup = mongoose.model('Signup', Signup);

    return Signup;





     Schema = mongoose.Schema

    var UserSchema = new Schema({});
    UserSchema.plugin(mongooseAuth, {
      facebook: true
    });

