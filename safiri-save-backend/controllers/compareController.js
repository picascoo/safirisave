import { getRouteDetails } from '../services/googleMapsService.js';
import { simulateAllPrices } from '../services/priceSimulatorService.js';

export const getPriceComparisons = async (req, res) => {
  const { origin, destination } = req.body;

  if (!origin || !destination) {
    return res.status(400).json({ message: 'Origin and destination are required.' });
  }

  try {
    // 1. Get distance and time from Google Maps
    const routeDetails = await getRouteDetails(origin, destination);

    // 2. Calculate prices based on that data
    const quotes = simulateAllPrices(
      routeDetails.distanceKm,
      routeDetails.durationMinutes
    );

    res.status(200).json({
      route: routeDetails,
      quotes: quotes,
    });
  } catch (error) {
    console.error('Error in getPriceComparisons:', error.message);
    res.status(500).json({
      message: 'Failed to get price comparisons.',
      error: error.message,
    });
  }
};