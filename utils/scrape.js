const cheerio = require('cheerio');

const DateHelper = require('./date');
const Request = require('./request');

let $;

const loadHtml = (html) => {
    $ = cheerio.load(html);
};

const getResultCount = () => $('.results__number__count').text();

const getListItems = () => {
    const timestamp = DateHelper.getTimestamp();
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
};

const scrapePage = async ({ processedUrl, page }) => {
    // First page already loaded
    if (page !== 1) {
        const pageUrl = Request.appendPageToUrl({ processedUrl, page });
        const html = await Request.fetchData(pageUrl);
        loadHtml(html);
    }
    const listItems = getListItems();
    return listItems;
};

const getAllItems = async ({ resultCount, processedUrl }) => {
    const pageNumbers = Request.getTotalPages(resultCount);
    let allItems = [];

    for (let page = 1; page <= pageNumbers; page++) {
        const listItems = await scrapePage({ processedUrl, page });
        allItems = [...allItems, ...listItems];
    }
    return allItems;
};

const scrapeAllPages = async ({ processedUrl }) => {
    const html = await Request.fetchData(processedUrl);
    loadHtml(html);
    const resultCount = getResultCount();
    if (resultCount < 1) return [];

    return getAllItems({ resultCount, processedUrl });
};

module.exports = {
    scrapeAllPages
};
