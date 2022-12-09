const config = {
  mongo: {
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    url: process.env.MONGO_URL,
  },
  server: {
    host: 'localhost',
    port: 1337,
  },
};

export default config;
