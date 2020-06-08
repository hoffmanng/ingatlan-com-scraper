const cheerio = require('cheerio');
const dateHelper = require('./date');
const request = require('./request');

let $;

const scrape = {
    loadHtml: (html) => {
        $ = cheerio.load(html);
    },

    getResultCount: () => $('.results__number__count').text(),

    getListItems: () => {
        const timestamp = dateHelper.getTimestamp();
        return $('.listing')
            .get()
            .map((item) => {
                const $item = $(item);
                return {
                    id: $item.attr('data-id'),
                    timestamp,
                    price: $item.find('.price').text(),
                    location: $item.find('.listing__address').text(),
                    link: $item.find('.listing__link').attr('href'),
                    building_area: $item.find('.listing__data--area-size').text() || undefined,
                    plot_area: $item.find('.listing__data--plot-size').text() || undefined,
                    room_count: $item.find('.listing__data--room-count').text() || undefined,
                    balcony_size: $item.find('.listing__data--balcony-size').text() || undefined
                };
            });
    },

    scrapePage: async ({ processedUrl, page }) => {
        // First page already loaded
        if (page !== 1) {
            const pageUrl = request.appendPageToUrl({ processedUrl, page });
            const html = await request.fetchData(pageUrl);
            scrape.loadHtml(html);
        }
        const listItems = scrape.getListItems();
        return listItems;
    },

    getAllItems: async ({ resultCount, processedUrl }) => {
        const pageNumbers = request.getTotalPages(resultCount);
        let allItems = [];

        for (let page = 1; page <= pageNumbers; page++) {
            const listItems = await scrape.scrapePage({ processedUrl, page });
            allItems = [...allItems, ...listItems];
        }
        return allItems;
    },

    scrapeAllPages: async ({ processedUrl }) => {
        const html = await request.fetchData(processedUrl);
        scrape.loadHtml(html);
        const resultCount = scrape.getResultCount();
        if (resultCount < 1) return [];

        return scrape.getAllItems({ resultCount, processedUrl });
    }
};

module.exports = scrape;
