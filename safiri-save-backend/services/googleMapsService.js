import { Client } from '@googlemaps/google-maps-services-js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({});

export const getRouteDetails = async (origin, destination) => {
  try {
    const response = await client.directions({
      params: {
        origin: origin,
        destination: destination,
        key: process.env.GOOGLE_MAPS_API_KEY,
        region: 'ke', // Bias results to Kenya
      },
    });

    if (!response.data.routes || response.data.routes.length === 0) {
      throw new Error('No routes found between the specified locations.');
    }

    const leg = response.data.routes[0].legs[0];

    return {
      distanceMeters: leg.distance.value,
      distanceText: leg.distance.text,
      distanceKm: (leg.distance.value / 1000).toFixed(2),
      durationSeconds: leg.duration.value,
      durationText: leg.duration.text,
      durationMinutes: (leg.duration.value / 60).toFixed(0),
      startAddress: leg.start_address,
      endAddress: leg.end_address,
    };

  } catch (error) {
    console.error('Google Maps API Error:', error.message);
    throw new Error('Failed to fetch route details.');
  }
};