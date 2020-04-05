const getTimestamp = () => new Date(Date.now());

const getISODate = () => getTimestamp().toISOString();

module.exports = {
    getTimestamp,
    getISODate
};
