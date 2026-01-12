import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import SunCalc from "suncalc";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface WeatherData {
  clouds: number;
  visibility: number;
  wind_speed: number;
  weather_description: string;
}

export function calculatePhotoScore(data: WeatherData, lat: number, lon: number): { score: number; verdict: string; reasons: string[] } {
  let score = 5;
  const reasons: string[] = [];
  const now = new Date();

  // Get sun times
  const times = SunCalc.getTimes(now, lat, lon);

  // Check strict time windows
  const isGoldenHourTime = (now >= times.goldenHour && now <= times.sunset) || (now >= times.sunrise && now <= times.goldenHourEnd);
  const isBlueHourTime = (now >= times.sunset && now <= times.dusk) || (now >= times.dawn && now <= times.sunrise);

  // 1. LIGHT QUALITY (Time + Clouds)
  if (isGoldenHourTime) {
    if (data.clouds > 85) {
      // Golden Hour time, but blocked by clouds
      reasons.push("Golden Hour time, but light is blocked by clouds.");
      // No score increase
    } else if (data.clouds >= 30) {
      // Golden Hour + Clouds = Best possible conditions
      score += 4;
      reasons.push("Epic Golden Hour! Clouds will catch the color.");
    } else {
      // Clear Golden Hour
      score += 3;
      reasons.push("Golden Hour! clear warm light.");
    }
  } else if (isBlueHourTime) {
    if (data.clouds > 90) {
      reasons.push("Blue Hour obscured by overcast.");
    } else {
      score += 2;
      reasons.push("Blue Hour tones.");
    }
  }

  // 2. CLOUD COVER 
  if (!isGoldenHourTime) {
    if (data.clouds >= 30 && data.clouds <= 70) {
      score += 2;
      reasons.push("Good cloud texture.");
    } else if (data.clouds === 100) {
      score -= 1;
      reasons.push("Flat light (Overcast).");
    } else if (data.clouds < 10) {
      reasons.push("Clear skies (High contrast).");
    }
  }

  // 3. VISIBILITY / ATMOSPHERE
  if (data.visibility <= 2000) {
    score += 3;
    reasons.push("Fog/Mist detected! Moody atmosphere.");
  } else if (data.visibility > 10000) {
    score += 1;
    reasons.push("Excellent visibility.");
  }

  // 4. WIND
  if (data.wind_speed > 30) {
    score -= 2;
    reasons.push("High winds - secure your tripod.");
  }

  // 5. WEATHER EVENTS
  const desc = data.weather_description.toLowerCase();
  if (desc.includes("rain") || desc.includes("drizzle")) {
    score -= 2;
    reasons.push("Rain likely.");
  } else if (desc.includes("snow")) {
    score += 2;
    reasons.push("Snow creates clean compositions.");
  } else if (desc.includes("thunderstorm")) {
    score -= 3;
    reasons.push("Stormy conditions - stay safe.");
  }

  // Clamp score
  score = Math.max(0, Math.min(10, score));

  // Determine Verdict
  let verdict = "Mediocre";
  if (score >= 9) verdict = "World Class";
  else if (score >= 7) verdict = "Excellent";
  else if (score >= 5) verdict = "Good";
  else if (score >= 3) verdict = "Fair";
  else verdict = "Poor";

  return { score, verdict, reasons };
}