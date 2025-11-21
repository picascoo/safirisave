/**
 * Price Simulator Service
 * Simulates ride-hailing prices based on distance, time, and surge logic.
 */

const PRICING_MODELS = {
  Uber: {
    serviceName: 'Uber',
    baseFare: 100,
    perKm: 35,
    perMin: 4,
    logoUrl: 'https://placehold.co/100?text=Uber',
    surgeChance: 0.3,
    minSurge: 1.2,
    maxSurge: 1.8,
  },
  Bolt: {
    serviceName: 'Bolt',
    baseFare: 90,
    perKm: 32,
    perMin: 3,
    logoUrl: 'https://placehold.co/100?text=Bolt',
    surgeChance: 0.4,
    minSurge: 1.3,
    maxSurge: 2.0,
  },
  Little: {
    serviceName: 'Little',
    baseFare: 95,
    perKm: 34,
    perMin: 3,
    logoUrl: 'https://placehold.co/100?text=Little',
    surgeChance: 0.2,
    minSurge: 1.1,
    maxSurge: 1.5,
  },
  Faras: {
    serviceName: 'Faras',
    baseFare: 80,
    perKm: 30,
    perMin: 3,
    logoUrl: 'https://placehold.co/100?text=Faras',
    surgeChance: 0.1,
    minSurge: 1.1,
    maxSurge: 1.3,
  },
};

/**
 * Calculates a single ride quote.
 */
const calculateQuote = (model, distanceKm, durationMinutes) => {
  // 1. Base Calculation
  const distanceCost = model.perKm * distanceKm;
  const timeCost = model.perMin * durationMinutes;
  let estimatedPrice = model.baseFare + distanceCost + timeCost;

  let surge = false;
  let surgeMessage = null;

  // 2. Surge Logic
  if (Math.random() < model.surgeChance) {
    surge = true;
    const surgeMultiplier = Math.random() * (model.maxSurge - model.minSurge) + model.minSurge;
    estimatedPrice *= surgeMultiplier;
    surgeMessage = `High demand! Price is ${surgeMultiplier.toFixed(1)}x.`;
  }

  // 3. ETA Logic
  const etaMinutes = Math.floor(Math.random() * 9) + 2;

  return {
    serviceName: model.serviceName,
    logoUrl: model.logoUrl,
    estimatedPrice: Math.round(estimatedPrice),
    etaMinutes: etaMinutes,
    surge: surge,
    surgeMessage: surgeMessage,
  };
};

/**
 * Generates quotes for all services.
 */
export const simulateAllPrices = (distanceKm, durationMinutes) => {
  const dist = parseFloat(distanceKm);
  const dur = parseFloat(durationMinutes);

  const quotes = [];
  for (const key in PRICING_MODELS) {
    quotes.push(calculateQuote(PRICING_MODELS[key], dist, dur));
  }
  return quotes;
};