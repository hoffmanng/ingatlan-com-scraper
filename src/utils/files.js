const fs = require('fs').promises;
const path = require('path');

const DateHelper = require('./date');

const dataFolder = path.join('.', 'data');

const getQueryFolder = ({ searchQuery }) => {
    if (!searchQuery) throw new Error('Invalid URL: missing search query');
    return path.join(dataFolder, searchQuery);
};

const checkFolders = async ({ searchQuery }) => {
    const queryFolder = getQueryFolder({ searchQuery });
    try {
        await fs.access(dataFolder);
    } catch (e) {
        await fs.mkdir(dataFolder);
    }
    try {
        await fs.access(queryFolder);
    } catch (e) {
        await fs.mkdir(queryFolder);
    }
};

const writeResult = async ({ searchQuery, fileContent }) => {
    const queryFolder = getQueryFolder({ searchQuery });
    const file = path.join(queryFolder, `${DateHelper.getISODate()}.json`);
    await checkFolders({ searchQuery });
    await fs.writeFile(file, JSON.stringify(fileContent, null, '    '));
    // eslint-disable-next-line no-console
    console.log(`${file} created`);
};

module.exports = {
    writeResult
};
