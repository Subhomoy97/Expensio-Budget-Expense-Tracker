const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 8 },
    isAdmin: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isProfileCreated: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;

userSchema.virtual('profile', {
  ref: 'profile',
  localField: '_id',
  foreignField: 'userId',
  justOne: true
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });
