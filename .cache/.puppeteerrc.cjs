const {join} = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  browserRevision: '113.0.5672.0',
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};