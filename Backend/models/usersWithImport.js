const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const schema = mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  });

  schema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    next();
  });

  schema.methods.generateToken = async function (fastify) {
    let user = this;
    const token = fastify.jwt.sign({ _id: user._id.toString()});
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
  };

  /* it should decode and verify before this but pass both*/
  schema.statics.findByToken = async function (token, fastify) {
    let User = this;
    let decoded;
    try {
      if (!token) {
        return new Error("Missing token Header");
      }
      decoded = fastify.jwt.verify(token);
      /* if decoded.iat isGreaterThan Date().now => fjern token fra user og returner en error */
      if(decoded.iat < Date.now()) {
        return new Error('expired token')
      }
    } catch (error) {
      return error;
    }
    return await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
  }

  schema.statics.findByCredentials = async(email, password) => {
      const user = await User.findOne({ email })
      if (!user) {
        throw new Error('Forkert Email eller Password')
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
          throw new Error('Forker Email eller Password')
      }
      return user
  }

  const User = mongoose.model("User", schema);
  module.exports = User;  