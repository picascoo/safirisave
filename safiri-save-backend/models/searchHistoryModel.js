import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  estimatedPrice: { type: Number, required: true },
  etaMinutes: { type: Number, required: true },
  surge: { type: Boolean, default: false },
}, { _id: false });

const searchHistorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    originAddress: { type: String, required: true },
    destinationAddress: { type: String, required: true },
    quotes: [quoteSchema],
  },
  { timestamps: true }
);

searchHistorySchema.index({ user: 1, createdAt: -1 });
const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);

// This is the line that was likely missing or broken
export default SearchHistory;