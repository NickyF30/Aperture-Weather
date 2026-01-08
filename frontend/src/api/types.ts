export interface Coordinates {
    lat: number;
    lon: number;
}

export interface WeatherData {
    id: number;
    main: string;
    description: string;
    icon: string;
}