/* eslint-disable */

import 'dotenv/config';
import joi from 'joi';

interface EnvVars {
  STRIPE_SECRET_KEY: string;
  PORT: number;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    STRIPE_SECRET_KEY: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(
  process.env,
) as joi.ValidationResult<EnvVars>;

if (error) {
  throw new Error(`Config validation error: \${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  stripeSecretKey: envVars.STRIPE_SECRET_KEY,
  port: envVars.PORT,
};
