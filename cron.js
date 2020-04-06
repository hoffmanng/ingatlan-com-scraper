const cron = require('node-cron');

const Scraper = require('./scrape');

(() => {
    Scraper.scrape(process.argv);

    cron.schedule('0 12 * * *', () => {
        Scraper.scrape(process.argv);
    });
})();
