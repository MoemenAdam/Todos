import mongoose from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
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
    },
    lang: {
      type: String,
      enum: ['en', 'ar'],
      default: 'en',
    },
    theme: {
      type: String,
      enum: ['dark', 'light'],
      default: 'dark',
    },
    fcmTokens: [String],
    allowNotification: {
      type: Boolean,
      default: false,
    },
    notificationSound: {
      type: String,
      enum: ['default'],
      default: 'default',
    },
    confirmEmailOTP: String,
    confirmEmailOTPExpires: Date,
    resetPasswordOTP: String,
    resetPasswordOTPExpires: Date,
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
  this.resetPasswordOTP = undefined;
  this.resetPasswordOTPExpires = undefined;
});

Schema.methods.generateconfirmEmailOTP = function () {
  const otp = crypto.randomInt(100000, 999999).toString();
  this.confirmEmailOTP = crypto.createHash('sha256').update(otp).digest('hex');
  this.confirmEmailOTPExpires = Date.now() + 5 * 60 * 1000;
  return otp;
};

Schema.methods.generateResetPasswordOTP = function () {
  const otp = crypto.randomInt(100000, 999999).toString();
  this.resetPasswordOTP = crypto.createHash('sha256').update(otp).digest('hex');
  this.resetPasswordOTPExpires = Date.now() + 5 * 60 * 1000;
  return otp;
};

Schema.methods.validatePassword = async function (comparePass) {
  return await bcryptjs.compare(comparePass, this.password);
};

Schema.methods.validateConfirmEmailOTP = function (newOTP) {
  const hashed = crypto.createHash('sha256').update(newOTP).digest('hex');
  return hashed === this.confirmEmailOTP;
};

Schema.methods.validateResetPasswordOTP = function (newOTP) {
  const hashed = crypto.createHash('sha256').update(newOTP).digest('hex');
  return hashed === this.resetPasswordOTP;
};

Schema.methods.validateOTPExpires = function (Expires) {
  return Date.now() < Expires;
};

Schema.set('toJSON', {
  transform(doc, ret) {
    delete ret.token;
    delete ret.password;
    delete ret.confirmEmailOTP;
    delete ret.confirmEmailOTPExpires;
    delete ret.resetPasswordOTP;
    delete ret.resetPasswordOTPExpires;
    delete ret.deletedAt;
    return ret;
  },
});

const Model = mongoose.model('User', Schema);

export default Model;
