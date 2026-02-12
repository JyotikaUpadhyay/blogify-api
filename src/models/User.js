// src/models/User.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // ❗ DO NOT add unique:true here
    username: {
      type: String,
      required: true,
      trim: true,
    },

    // Email unique is OK (case handled by lowercase:true)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
  },
  { timestamps: true }
);

/* ============================
   CASE-INSENSITIVE UNIQUE INDEX
============================ */

userSchema.index(
  { username: 1 },
  {
    unique: true,
    collation: { locale: "en", strength: 2 }, // ignores case
  }
);

/* ============================
   HASH PASSWORD BEFORE SAVE
============================ */

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

module.exports = mongoose.model("User", userSchema);
