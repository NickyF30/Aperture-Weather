import Fastify from 'fastify'
import { config } from 'dotenv';
import { WeatherService } from './services/weather.service';
import cors from '@fastify/cors';

config();

const app = Fastify({ logger: true });

// check for API key
if (!process.env.OPENWEATHER_API_KEY) {
  app.log.error('Missing OPENWEATHER_API_KEY in environment');
  process.exit(1);
}

const weatherService = new WeatherService(process.env.OPENWEATHER_API_KEY!);

// Enable CORS for frontend
app.register(require('@fastify/cors'), {
  origin: 'http://localhost:5173', // Vite's default port
});

app.get('/health', async () => {
  return { status: 'ok' };
});

//weather by lat lon route for frontend
app.get('/api/weather', async (request, reply) => {
  try {
    const { lat, lon } = weatherService.validateQuery(request.query);
    const weather = await weatherService.getCurrentWeather(lat, lon);
    return weather;
  } catch (error) {
    app.log.error(error);
    reply.code(400).send({ error: 'Invalid request' });
  }
});

//city based route for frontend
app.get('/api/weather/city', async (request, reply) => {
  try {
    const { q } = weatherService.validateCityQuery(request.query);
    const { lat, lon } = await weatherService.getCoordinatesByCity(q);
    const weather = await weatherService.getCurrentWeather(lat, lon);
    return weather;
  } catch (error: any) {
    return reply.code(404).send({ error: error.message || 'City search failed' });
  }
});

app.get('/api/weather/forecast', async (request, reply) => {
  try {
    const { lat, lon } = weatherService.validateQuery(request.query);
    const forecast = await weatherService.getForecast(lat, lon);
    return forecast;
  } catch (error) {
    app.log.error(error);
    reply.code(400).send({ error: 'Invalid request' });
  }
});

app.listen({ port: Number(process.env.PORT) || 3001 }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
