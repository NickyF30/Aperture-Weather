import Fastify from 'fastify'
import { config } from 'dotenv';
import { WeatherService } from './services/weather.service';

const app = Fastify({ logger: true });
const weatherService = new WeatherService(process.env.OPENWEATHER_API_KEY!);

// Enable CORS for frontend
app.register(require('@fastify/cors'), {
  origin: 'http://localhost:5173', // Vite's default port
});

app.get('/health', async () => {
  return { status: 'ok' };
});

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

app.listen({ port: Number(process.env.PORT) || 3001 }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});