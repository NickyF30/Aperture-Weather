import { useState, useEffect } from "react";

interface FavoriteCity {
  id: string; 
  name: string;
  query: string; 
  lat: number;
  lon: number;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("weather-favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const addFavorite = (city: FavoriteCity) => {
    const updated = [...favorites, city];
    setFavorites(updated);
    localStorage.setItem("weather-favorites", JSON.stringify(updated));
  };

  const removeFavorite = (cityId: string) => {
    const updated = favorites.filter((city) => city.id !== cityId);
    setFavorites(updated);
    localStorage.setItem("weather-favorites", JSON.stringify(updated));
  };

  const isFavorite = (cityId: string) => {
    return favorites.some((city) => city.id === cityId);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
}