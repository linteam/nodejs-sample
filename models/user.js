const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true //e-posta adresinin unique olmasi onemli
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024 //hash'ini tutariz
    //joi-password-complexity
  },
  isAdmin: Boolean
});

//JSON Web Token - JWT
//Client tarafinda local storage'da tutabilirsin
//jwt.io ile inceleyebilir, JWT string'i 3 parcadan olusur.
//Header (alg, typ); Payload (public sik kullanilacak veriler icerir); Signature
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
