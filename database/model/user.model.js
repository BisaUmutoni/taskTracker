const mongoose = require ('mongoose');
const bcrypt = require ('bcryptjs'); // To hide user password

const userSchema = mongoose.Schema ({
    username: { type: String}, // parameters type
    email: { type: String},
    password: { type: String},
},
{timestamp: true} //real time stuff
);

//pre-save password
userSchema.pre('save', function(next){
    if (this.isModified('password')) {
        // generate hash for password
        bcrypt.genSalt(10, (err, salt) => {
          /* istanbul ignore next */
          if (err) return next(err);
          bcrypt.hash(this.password, salt, (err, hash) => {
            /* istanbul ignore next */
            if (err) return next(err);
            this.password = hash;
            next();
          });
        });
      } else {
        next();
      }
})
        userSchema.methods.comparePassword = function (password, next) 
        {
            bcrypt.compare(password, this.password, function(err,match) {
                if (err) { return next (err,false)
                }
                return next (null, match);
            });
        }
    
    const User = mongoose.model('User', userSchema);
    module.exports = User;
