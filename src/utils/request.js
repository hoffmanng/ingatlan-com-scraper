const axios = require('axios');

const request = {
    fetchData: async (url) => {
        const result = await axios.get(url);
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
