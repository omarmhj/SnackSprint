import * as path from 'path';

// Determines which .env file to load based on an environment variable (e.g., APP_SERVICE)
export function getEnvFilePath(): string {
  const service = process.env.APP_SERVICE || 'default';
  const envFileName = `.env.${service}`;
  
  // Try to resolve from the current working directory (servers/)
  const envPath = path.resolve(process.cwd(), envFileName);
  
  console.log(`Loading environment file: ${envPath} for service: ${service}`);
  
  return envPath;
}

export function configuration() {
  return {
    serviceEnv: process.env.APP_SERVICE || 'default',
    database: {
      url: process.env.DATABASE_URL,
    },
    jwt: {
      accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
      refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
      activationSecret: process.env.ACTIVATION_SECRET,
      forgotPasswordSecret: process.env.FORGOT_PASSWORD_SECRET,
    },
    smtp: {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      user: process.env.SMTP_MAIL,
      password: process.env.SMTP_PASSWORD,
      service: process.env.SMTP_servcie,
    },
    client: {
      uri: process.env.CLIENT_SIDE_URI,
    },
  };
} 