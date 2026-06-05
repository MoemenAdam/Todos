import mongoose from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: "Email isn't coorect",
      },
    },
    lang: {
      type: String,
      enum: {
        values: ['en', 'ar'],
        default: 'en',
        message: 'Lang is either: en, ar',
      },
    },
    theme: {
      type: String,
      enum: {
        values: ['dark', 'light'],
        default: 'dark',
        message: 'Theme is either: dark, light',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    token: String,
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

Schema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcryptjs.hash(this.password, 12);
  this.token = undefined;
});

Schema.methods.validatePassword = async function (newPassowrd, oldPassword) {
  return await bcryptjs.compare(newPassowrd, oldPassword);
};

const Model = mongoose.model('User', Schema);

export default Model;
