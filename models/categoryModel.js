import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Model = mongoose.model('Category', Schema);

export default Model;
