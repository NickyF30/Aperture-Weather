import { CurrentWeatherCard } from "@/components/ui/layout/cards/current-weather-card";
import { WindCard } from "@/components/ui/layout/cards/wind-card";
import { HumidityCard } from "@/components/ui/layout/cards/humidity-card";
import { CloudCard } from "@/components/ui/layout/cards/cloud-card";
import { VisibilityCard } from "@/components/ui/layout/cards/visibility-card";
import { DailyForecastCard } from "@/components/ui/layout/cards/daily-forecast";
import { HourlyForecastCard } from "@/components/ui/layout/cards/hourly-forecast-card";
import { WeatherSummaryCard } from "@/components/ui/layout/cards/weather-summary-card";
import { SunPhaseCard } from "@/components/ui/layout/cards/sun-phase-card";
import { PhotoScoreCard } from "@/components/ui/layout/cards/photo-score-card";
import { AQICard } from "@/components/ui/layout/cards/aqi-card";
import { UVCard } from "@/components/ui/layout/cards/uv-card";
import { MoonCard } from "@/components/ui/layout/cards/moon-card";

interface WeatherGrid {
    data: any;
    forecastData: any;
}

export const WeatherGrid = ({ data, forecastData }: WeatherGrid) => {
    return (
        <div className="space-y-4">
            {/* Photography Score Card */}
            <PhotoScoreCard
                data={data}
                lat={data.coord.lat}
                lon={data.coord.lon}
            />

            {/* Top Section */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Left Column: Summary + Current Weather */}
                <div className="lg:col-span-3 flex flex-col gap-4 h-full">
                    <WeatherSummaryCard
                        cityName={data.cityName}
                        temp={data.temp}
                        feelsLike={data.feels_like}
                        description={data.weather_description}
                        humidity={data.humidity}
                        windSpeed={data.wind_speed}
                    />
                    <CurrentWeatherCard
                        cityName={data.cityName}
                        temp={data.temp}
                        tempMin={data.temp_min}
                        tempMax={data.temp_max}
                        feelsLike={data.feels_like}
                        description={data.weather_description}
                    />
                </div>

                {/* Right Column: Hourly + Daily */}
                <div className="lg:col-span-1 flex flex-col gap-4">
                    <HourlyForecastCard hourly={forecastData?.hourly || []} />
                    <DailyForecastCard forecast={forecastData?.daily || []} />
                </div>
            </div>


            {/* Bottom Section: Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <HumidityCard humidity={data.humidity} />
                <WindCard
                    speed={data.wind_speed}
                    deg={data.wind_deg}
                    gust={data.wind_gust}
                />
                <AQICard
                    aqi={data.aqi}
                    pollutants={data.pollutants}
                />
                <UVCard uv={data.uv} />
                <CloudCard clouds={data.clouds} />
                <VisibilityCard visibility={data.visibility} />
                <SunPhaseCard
                    lat={data.coord.lat}
                    lon={data.coord.lon}
                />
                <MoonCard
                    lat={data.coord.lat}
                    lon={data.coord.lon}
                />
            </div>
        </div>
    );
};