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

const getLastFileName = async ({ searchQuery }) => {
    const queryFolder = getQueryFolder({ searchQuery });
    const files = await fs.readdir(queryFolder);
    return files[files.length - 1];
};

const getFilePath = ({ searchQuery, fileName }) => {
    const queryFolder = getQueryFolder({ searchQuery });
    return path.join(queryFolder, fileName);
};

const readLastFile = async ({ searchQuery }) => {
    const fileName = await getLastFileName({ searchQuery });
    const filePath = getFilePath({ searchQuery, fileName });
    const resultFileContentRaw = await fs.readFile(filePath);
    return JSON.parse(resultFileContentRaw);
};

const removeLastFile = async ({ searchQuery }) => {
    const fileName = await getLastFileName({ searchQuery });
    const queryFolder = getQueryFolder({ searchQuery });
    const filePath = path.join(queryFolder, fileName);
    await fs.unlink(filePath);
};

const removeFolder = async ({ searchQuery }) => {
    const queryFolder = getQueryFolder({ searchQuery });
    await fs.rmdir(queryFolder);
};

module.exports = {
    writeResult,
    getQueryFolder,
    getLastFileName,
    getFilePath,
    readLastFile,
    removeLastFile,
    removeFolder
};
