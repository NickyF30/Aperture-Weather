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
  wind_gust?: number;
  weather_description: string;
  aqi?: number;
  uv?: number;
  humidity: number;
  temp: number;
  feels_like: number;
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
  // Define Night as time after dusk or before dawn
  const isNight = now > times.dusk || now < times.dawn;

  // 1. LIGHT QUALITY 
  if (isNight) {
    score -= 3;
    reasons.push("Night time: Low light. Tripod/High ISO required.");

    if (data.clouds < 10 && data.visibility > 10000) {
      score += 4; // Bring score back up for Astro
      reasons.push("Clear dark skies: Excellent for Astrophotography.");
    } else if (data.clouds > 60) {
      score -= 1;
      reasons.push("Night overcast: Poor shooting conditions.");
    }
  } else if (isGoldenHourTime) {
    if (data.clouds > 85) {
      reasons.push("Golden Hour time, but light is blocked by thick clouds.");
      // No score increase
    } else if (data.clouds >= 30) {
      score += 4;
      reasons.push("Epic Golden Hour! Clouds will catch the color.");
    } else {
      score += 3;
      reasons.push("Golden Hour! Clear warm light.");
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
  if (!isGoldenHourTime && !isBlueHourTime && !isNight) {
    if (data.clouds >= 30 && data.clouds <= 70) {
      score += 2;
      reasons.push("Good cloud texture for depth.");
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
    if (!isNight) {
      score += 1;
      reasons.push("Excellent visibility.");
    }
  }

  // 4. AIR QUALITY 
  if (data.aqi !== undefined) {
    if (data.aqi <= 2) {
      reasons.push("Clean air: Crisp, sharp details.");
    } else if (data.aqi >= 4) {
      if (isGoldenHourTime) {
        reasons.push("High particles: Intense sunset colors likely.");
      } else {
        reasons.push("Haze/Pollution: Reduced distant clarity.");
      }
    }
  }

  // 5. HUMIDITY & TEMPERATURE
  if (data.humidity > 85) {
    reasons.push("High humidity: Softens light, potential for dew.");
  }

  if (data.temp < 0) {
    reasons.push("Freezing: Monitor battery life.");
  } else if (data.temp > 30) {
    reasons.push("High heat: Risk of heat haze on telephoto shots.");
  }

  // 6. UV INDEX
  if (!isGoldenHourTime && !isBlueHourTime && !isNight && data.uv !== undefined) {
    if (data.uv > 7) {
      score -= 1;
      reasons.push("High UV: Harsh shadows. Use ND filters/diffusers.");
    }
  }

  // 7. WIND & GUSTS
  if (data.wind_speed > 30) {
    score -= 2;
    reasons.push("High winds: Secure your tripod.");
  }

  if (data.wind_gust && data.wind_gust > 45) {
    score -= 1;
    reasons.push(`Strong gusts (${Math.round(data.wind_gust)}km/h): Drone flight risky.`);
  }

  // 8. WEATHER EVENTS
  const desc = data.weather_description.toLowerCase();
  if (desc.includes("rain") || desc.includes("drizzle")) {
    score -= 2;
    reasons.push("Rain likely: Protect gear.");
  } else if (desc.includes("snow")) {
    score += 2;
    reasons.push("Snow creates clean compositions.");
  } else if (desc.includes("thunderstorm")) {
    score -= 4;
    reasons.push("Lightning risk: Stay safe, avoid open fields.");
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