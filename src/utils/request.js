const axios = require('axios');

const request = {
    fetchData: async (url) => {
        const config = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
                + '(KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36'
            }
        };
        const result = await axios.get(url, config);
        return result.data;
    },

    removePaginationFromUrl: (url) => url.split('?')[0],

    getSearchQuery: (url) => {
        const urlParts = url.split('/');
        return urlParts[urlParts.length - 1];
    },

    processUrl: ({ rawUrl }) => {
        const url = new URL(rawUrl).href;
        const processedUrl = request.removePaginationFromUrl(url);
        const searchQuery = request.getSearchQuery(processedUrl);
        return {
            processedUrl,
            searchQuery
        };
    },

    appendPageToUrl: ({ processedUrl, page }) => `${processedUrl}?page=${page}`,

    getTotalPages: (resultCount) => {
        if (resultCount === 0) {
            return 1;
        }
        return Math.ceil(resultCount / 20);
    }
};

module.exports = request;
