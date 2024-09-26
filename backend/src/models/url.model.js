import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    visitHistory: [
      {
        timeStamp: { type: String },
      },
    ],
  },
  { timeStamps: true }
);

export const Url = mongoose.model('Url', UrlSchema);
