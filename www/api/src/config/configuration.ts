export default () => ({
  port: parseInt(process.env.PORT, 10) || 8686,
  database: {
    uri: process.env.DB_URI,
  },
  redis: {
    url: process.env.REDIS_HOST,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
