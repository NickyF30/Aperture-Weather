import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { calculatePhotoScore } from './utils';

// SunCalc to control Time in tests
vi.mock('suncalc', () => ({
  default: {
    getTimes: () => ({
      sunrise: new Date('2024-01-01T06:00:00'),
      goldenHourEnd: new Date('2024-01-01T07:00:00'),
      goldenHour: new Date('2024-01-01T17:00:00'),
      sunset: new Date('2024-01-01T18:00:00'),
      dusk: new Date('2024-01-01T19:00:00'),
      dawn: new Date('2024-01-01T05:00:00'),
    }),
  },
}));

describe('calculatePhotoScore', () => {
  // hours
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return a high score for Clear Skies at Night (Astrophotography)', () => {
    // 11 PM
    const date = new Date('2024-01-01T23:00:00');
    vi.setSystemTime(date);

    const mockWeather = {
      clouds: 0, // Clear
      visibility: 15000, // Good visibility
      wind_speed: 5,
      weather_description: 'clear sky',
      aqi: 1,
      uv: 0,
      humidity: 50,
      temp: 15,
      feels_like: 15
    };

    const result = calculatePhotoScore(mockWeather, 0, 0);
    
    // Logic: Base 5 - 3 (Night) + 4 (Astro Bonus) = 6
    expect(result.score).toBeGreaterThanOrEqual(6);
    expect(result.reasons).toContain("Clear dark skies: Excellent for Astrophotography.");
  });

  it('should penalize score heavily for Rain', () => {
    // 2 PM 
    const date = new Date('2024-01-01T14:00:00');
    vi.setSystemTime(date);

    const mockWeather = {
      clouds: 100,
      visibility: 5000,
      wind_speed: 10,
      weather_description: 'light rain',
      aqi: 1,
      uv: 1,
      humidity: 90,
      temp: 10,
      feels_like: 8
    };

    const result = calculatePhotoScore(mockWeather, 0, 0);
    
    expect(result.score).toBeLessThan(5); // Should be low
    expect(result.reasons).toContain("Rain likely: Protect gear.");
  });
});