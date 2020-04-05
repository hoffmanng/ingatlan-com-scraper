const axios = require('axios');

const fetchData = async (url) => {
    const result = await axios.get(url);
    return result.data;
};

const removePaginationFromUrl = (url) => url.split('?')[0];

const getSearchQuery = (url) => {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
};

const processUrl = ({ rawUrl }) => {
    const url = new URL(rawUrl).href;
    const processedUrl = removePaginationFromUrl(url);
    const searchQuery = getSearchQuery(processedUrl);
    return {
        processedUrl,
        searchQuery
    };
};

const appendPageToUrl = ({ processedUrl, page }) => `${processedUrl}?page=${page}`;

const getTotalPages = (resultCount) => Math.ceil(resultCount / 20);

module.exports = {
    fetchData,
    processUrl,
    appendPageToUrl,
    getTotalPages
};
