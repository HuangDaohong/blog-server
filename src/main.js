const { APP_PORT } = require('./config/config.default');

const app = require('./app');

app.listen(APP_PORT, '0.0.0.0', () => {
  console.log(`server is running on http://localhost:${APP_PORT}`);
});
