const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Doctor = require('./lib/models/doctorSchema');
const bcrypt = require('bcryptjs');

const genPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const genHash = bcrypt.hashSync(password, salt);

    return {
        salt: salt,
        hash: genHash
    };
};

const validatePassword = (password, hash, salt) => {
    const hashVerify = bcrypt.hashSync(password, salt);

    return hash === hashVerify;
};

const veryfiCallback = (username, password, done) => {
    
    Doctor.findOne({ username: username })
    .then(user => {
        if(!user) { return done(null, false) }

        const isValid = validatePassword(password, user.hash, user.salt);

        if(isValid) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
    .catch(err => {
        done(err);
    });
};

const strategy = new LocalStrategy(veryfiCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  Doctor.findById(userId)
    .then(user => {
        done(null, user);
    })
    .catch(err => done(err));
});

module.exports.genPassword = genPassword;