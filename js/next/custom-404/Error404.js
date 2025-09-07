// models/Error404.js (for MongoDB with Mongoose)
import mongoose from 'mongoose';

const error404Schema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  referrer: String,
  userAgent: String,
  ip: String,
  userAction: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  resolved: {
    type: Boolean,
    default: false,
  },
  occurrenceCount: {
    type: Number,
    default: 1,
  },
});

export default mongoose.models.Error404 || mongoose.model('Error404', error404Schema);