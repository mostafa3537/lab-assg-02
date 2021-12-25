const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

//create Schema then model then document

const userSchema = new mongoose.Schema({
  userName: {
    type: [String, "pleas enter valid name"],
    minlength: [8, "mimum title is 8 character"],
    required: true,
    unique: true,
  },
  firstName: {
    type: [String, "pleas enter valid first name"],
    minlength: [3, "mimum title is 3 character"],
    maxlength: [15, "mimum title is 15 character"],
    required: true,
  },

  lastName: {
    type: String,
    minlength: [3, "mimum title is 3 character"],
    maxlength: [15, "mimum title is 15 character"],
    required: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  dob: Date,
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

//user is an instance of mongoose model
const user = mongoose.model("User", userSchema);

module.exports = user;
