const cheerio = require('cheerio');
const scrape = require('./scrape');

jest.mock('cheerio');

beforeEach(() => {
    jest.clearAllMocks();
});

test('When loadHtml is called with a parameter then cheerio.load is called with the same parameter', () => {
    const html = '<h1>Heading</h1>';

    scrape.loadHtml(html);
    expect(cheerio.load).toHaveBeenCalledWith(html);
});
