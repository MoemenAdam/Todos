import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    priority: {
      type: String,
      enum: ['low', 'med', 'high'],
    },
    dueDate: {
      type: Date,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

Schema.index({
  dueDate: 1,
  user: 1
});

const Model = mongoose.model('Task', Schema);

export default Model;
