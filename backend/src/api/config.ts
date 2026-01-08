import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  PORT: z.string().default('3001').transform(Number),
  OPENWEATHER_API_KEY: z.string().min(1, "API Key is required"),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('Invalid environment variables:', env.error.format());
  process.exit(1);
}

export const ENV = env.data;