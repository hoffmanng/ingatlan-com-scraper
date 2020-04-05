const Request = require('./utils/request');
const Scraper = require('./utils/scrape');
const FileWriter = require('./utils/files');

(async () => {
    const urls = process.argv.slice(2);
    for (const rawUrl of urls) {
        try {
            const { processedUrl, searchQuery } = Request.processUrl({ rawUrl });
            const listItems = await Scraper.scrapeAllPages({ processedUrl });
            await FileWriter.writeResult({ searchQuery, fileContent: listItems });
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e.message);
        }
    }
})();
