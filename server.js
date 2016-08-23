const path = require('path');
const express = require('express');
const winston = require('winston');
const helmet = require('helmet');
const proxy = require('http-proxy-middleware');
const historyApiFallback = require('connect-history-api-fallback');

const distPath = path.join(__dirname, './build');

const PORT = process.env.PORT || 8080;
const app = express();

// Enable various security helpers.
app.use(helmet());

const proxyServer = 'http://localhost:4000';

app.use(proxy('/api', {
  logLevel: 'debug',
  target: proxyServer, // target host
  changeOrigin: true,               // needed for virtual hosted sites
  ws: true,                         // proxy websockets
}));


// Allow HTML5 mode routing.
app.use(historyApiFallback({
  index: '/',
  verbose: true,
}));

app.use(express.static(distPath));

app.listen(PORT, (err) => {
  if (err) {
    winston.error(err);
    return;
  }

  winston.info(`Listening on port ${PORT}`);
});
