const date = {
    getTimestamp: () => new Date(Date.now()),

    getISODate: () => date.getTimestamp().toISOString()
};

module.exports = date;
