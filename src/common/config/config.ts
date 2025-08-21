/* eslint-disable */
import 'dotenv/config';
import * as Joi from 'joi';

interface EnvVars {
  STRIPE_SECRET_KEY: string;
  ENDPOINT_STRIPE_WEBHOOK: string;
}

const envsSchema = Joi.object<EnvVars>({
  STRIPE_SECRET_KEY: Joi.string().required(),
  ENDPOINT_STRIPE_WEBHOOK: Joi.string().required(),
}).unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars = value as EnvVars;

export const envs = {
  stripeSecretKey: envVars.STRIPE_SECRET_KEY,
  endpointStripeWebhook: envVars.ENDPOINT_STRIPE_WEBHOOK,
};
