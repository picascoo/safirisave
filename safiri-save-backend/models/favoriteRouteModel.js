import mongoose from 'mongoose';

const favoriteRouteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    originAddress: {
      type: String,
      required: true,
    },
    destinationAddress: {
      type: String,
      required: true,
    },
    alertPrice: {
      type: Number,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const FavoriteRoute = mongoose.model('FavoriteRoute', favoriteRouteSchema);
export default FavoriteRoute;