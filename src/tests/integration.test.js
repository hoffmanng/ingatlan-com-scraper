/* eslint-disable no-prototype-builtins */
/* eslint-disable no-console */
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const dateHelper = require('../utils/date');
const fileHelper = require('../utils/files');

const integrationTestTimeout = 15000;
const urlPrefix = 'https://ingatlan.com/lista';

const runOnce = async (rawUrl) => {
    // eslint-disable-next-line no-unused-vars
    const { stdout, stderr } = await exec(`npm run once ${rawUrl}`);
    // console.log('stdout:', stdout);
    if (!!stderr) {
        console.error('stderr:', stderr);
    }
    const timestamp = dateHelper.getISODate();
    // console.log(`script execution finished at: ${timestamp}`);
    return timestamp;
};

const cleanUp = async (searchQuery) => {
    try {
        await fileHelper.removeLastFile({ searchQuery });
        const lastFile = await fileHelper.getLastFileName({ searchQuery });
        if (!lastFile) {
            await fileHelper.removeFolder({ searchQuery });
        }
    } catch (e) {
        console.error(e.message);
    }
};

afterAll(async () => {
    await cleanUp('elado+lakas+sopron+40-45-m2');
    await cleanUp('elado+haz+x-ker+100-m2-alatt');
    await cleanUp('elado+telek+budapest+500-1000-mFt');
});

test('When I scrape "elado+lakas+sopron+40-45-m2", then I should get more than 20 flats as result', async () => {
    const searchQuery = 'elado+lakas+sopron+40-45-m2';
    const rawUrl = `${urlPrefix}/${searchQuery}?page=2`;
    let resultFileContent;

    try {
        await runOnce(rawUrl);
        resultFileContent = await fileHelper.readLastFile({ searchQuery });
    } catch (e) {
        console.error(e.message);
    }

    expect(resultFileContent.length).toBeGreaterThan(20);
    expect(resultFileContent[0].hasOwnProperty('id')).toBe(true);
    expect(resultFileContent[0].hasOwnProperty('timestamp')).toBe(true);
    expect(resultFileContent[0].hasOwnProperty('price')).toBe(true);
    expect(resultFileContent[0].hasOwnProperty('location')).toBe(true);
    expect(resultFileContent[0].hasOwnProperty('link')).toBe(true);
    expect(resultFileContent[0].hasOwnProperty('building_area')).toBe(true);
    expect(resultFileContent[0].hasOwnProperty('room_count')).toBe(true);
    expect(resultFileContent[0].hasOwnProperty('balcony_size')).toBe(true);
    expect(resultFileContent[0].hasOwnProperty('plot_area')).toBe(false);
}, integrationTestTimeout);

test('When I scrape "elado+haz+x-ker+100-m2-alatt", then I should get multiple houses as result', async () => {
    const searchQuery = 'elado+haz+x-ker+100-m2-alatt';
    const rawUrl = `${urlPrefix}/${searchQuery}?page=2`;
    let resultFileContent;

    try {
        await runOnce(rawUrl);
        resultFileContent = await fileHelper.readLastFile({ searchQuery });
    } catch (e) {
        console.error(e.message);
    }

    expect(resultFileContent.length).toBeGreaterThan(20);
    expect(resultFileContent[0].hasOwnProperty('id')).toBe(true);
    expect(resultFileContent[0].hasOwnProperty('timestamp')).toBe(true);
    expect(resultFileContent[0].hasOwnProperty('price')).toBe(true);
    expect(resultFileContent[0].hasOwnProperty('location')).toBe(true);
    expect(resultFileContent[0].hasOwnProperty('link')).toBe(true);
    expect(resultFileContent[0].hasOwnProperty('building_area')).toBe(true);
    expect(resultFileContent[0].hasOwnProperty('room_count')).toBe(true);
    expect(resultFileContent[0].hasOwnProperty('balcony_size')).toBe(false);
    expect(resultFileContent[0].hasOwnProperty('plot_area')).toBe(true);
}, integrationTestTimeout);

test('When I scrape "elado+telek+budapest+500-1000-mFt", then I should get multiple plots as result', async () => {
    const searchQuery = 'elado+telek+budapest+500-1000-mFt';
    const rawUrl = `${urlPrefix}/${searchQuery}`;
    let resultFileContent;

    try {
        await runOnce(rawUrl);
        resultFileContent = await fileHelper.readLastFile({ searchQuery });
    } catch (e) {
        console.error(e.message);
    }

    expect(resultFileContent.length).toBeGreaterThan(20);
    expect(resultFileContent[0].hasOwnProperty('id')).toBe(true);
    expect(resultFileContent[0].hasOwnProperty('timestamp')).toBe(true);
    expect(resultFileContent[0].hasOwnProperty('price')).toBe(true);
    expect(resultFileContent[0].hasOwnProperty('location')).toBe(true);
    expect(resultFileContent[0].hasOwnProperty('link')).toBe(true);
    expect(resultFileContent[0].hasOwnProperty('building_area')).toBe(false);
    expect(resultFileContent[0].hasOwnProperty('room_count')).toBe(false);
    expect(resultFileContent[0].hasOwnProperty('balcony_size')).toBe(false);
    expect(resultFileContent[0].hasOwnProperty('plot_area')).toBe(true);
}, integrationTestTimeout);
