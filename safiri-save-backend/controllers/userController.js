import FavoriteRoute from '../models/favoriteRouteModel.js';
import SearchHistory from '../models/searchHistoryModel.js';
import mongoose from 'mongoose';

export const getDashboardData = async (req, res) => {
  try {
    const favorites = await FavoriteRoute.find({ user: req.user._id }).sort({ createdAt: -1 });
    const history = await SearchHistory.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(5);

    res.json({
      favorites,
      history,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addFavoriteRoute = async (req, res) => {
  const { name, originAddress, destinationAddress, alertPrice } = req.body;

  try {
    const favorite = new FavoriteRoute({
      user: req.user._id,
      name,
      originAddress,
      destinationAddress,
      alertPrice: alertPrice || null,
    });

    const createdFavorite = await favorite.save();
    res.status(201).json(createdFavorite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteFavoriteRoute = async (req, res) => {
  try {
    const favorite = await FavoriteRoute.findById(req.params.id);

    if (!favorite) {
      return res.status(404).json({ message: 'Favorite route not found' });
    }

    if (favorite.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await favorite.deleteOne();
    res.json({ message: 'Favorite route removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logSearchHistory = async (req, res) => {
  const { originAddress, destinationAddress, quotes } = req.body;

  try {
    const search = new SearchHistory({
      user: req.user._id,
      originAddress,
      destinationAddress,
      quotes,
    });

    const createdSearch = await search.save();
    res.status(201).json(createdSearch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    const history = await SearchHistory.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPriceTrends = async (req, res) => {
  const { origin, destination } = req.query;

  if (!origin || !destination) {
    return res.status(400).json({ message: 'Origin and destination are required' });
  }

  try {
    const trends = await SearchHistory.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user._id),
          originAddress: origin,
          destinationAddress: destination,
        },
      },
      {
        $unwind: '$quotes',
      },
      {
        $group: {
          _id: '$quotes.serviceName',
          averagePrice: { $avg: '$quotes.estimatedPrice' },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          averagePrice: 1,
        },
      },
      {
        $project: {
          _id: 0,
          serviceName: '$_id',
          averagePrice: { $round: ['$averagePrice', 0] },
          dataPoints: '$count',
        },
      },
    ]);

    res.json(trends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};