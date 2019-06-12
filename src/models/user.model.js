const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const BCRYPT_HASH_ROUNDS = 10; // ~10 hashes/second

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  }
});

// eslint-disable-next-line func-names
UserSchema.pre('save', function(next) {
  if (!this.password) next();
  else {
    // Hash password before saving
    const { password } = this;
    bcrypt
      .hash(password, BCRYPT_HASH_ROUNDS)
      .then(hash => {
        // Replace password with hash
        this.password = hash;
        next();
      })
      .catch(error => next(error));
  }
});

UserSchema.methods.comparePasswords = async (firstPassword, secondPassword) =>
  bcrypt.compare(firstPassword, secondPassword);

module.exports = mongoose.model('User', UserSchema);
