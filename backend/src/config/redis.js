const IORedis = require("ioredis");

let redisClient;

const connectRedis = () => {
  try {
    redisClient = new IORedis(process.env.REDIS_URL);

    redisClient.on("connect", () => {
      console.log("Redis connected successfully");
    });

    redisClient.on("error", (error) => {
      console.error("Error connecting to Redis:", error);
    });
  } catch (error) {
    console.error("Could not create Redis client:", error);
  }
};

module.exports = {
  connectRedis,
  getRedisClient: () => redisClient,
};
