import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // JWT
  jwtSecret: process.env.JWT_SECRET || 'default_secret_key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',

  // Database
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'marketing_dashboard'
  },

  // Facebook Ads
  facebook: {
    accessToken: process.env.FACEBOOK_ACCESS_TOKEN || '',
    apiVersion: process.env.FACEBOOK_API_VERSION || 'v17.0',
    appId: process.env.FACEBOOK_APP_ID || '',
    appSecret: process.env.FACEBOOK_APP_SECRET || '',
    businessManagerId: process.env.FACEBOOK_BUSINESS_MANAGER_ID || '',
    webhookVerifyToken: process.env.FACEBOOK_WEBHOOK_VERIFY_TOKEN || ''
  },

  // Google Ads
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    developerToken: process.env.GOOGLE_DEVELOPER_TOKEN || ''
  },

  // TikTok Ads
  tiktok: {
    accessToken: process.env.TIKTOK_ACCESS_TOKEN || '',
    appId: process.env.TIKTOK_APP_ID || '',
    appSecret: process.env.TIKTOK_APP_SECRET || ''
  },

  // Redis
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASS || undefined
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    filename: process.env.LOG_FILE || 'app.log'
  }
}; 