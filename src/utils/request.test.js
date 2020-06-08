const axios = require('axios');
const request = require('./request');

jest.mock('axios');

beforeEach(() => {
    jest.clearAllMocks();
});

test('When data is fetched, then it should return data object', async () => {
    const responseData = 'responseData';
    const response = { data: responseData };
    axios.get.mockResolvedValue(response);

    return request.fetchData().then((data) => {
        expect(data).toEqual(responseData);
    });
});

test('When url is given with pagination, then it should remove paginaton from the end', () => {
    const url = 'https://xy.com/route/lastroute?page=2';
    const expected = 'https://xy.com/route/lastroute';

    expect(request.removePaginationFromUrl(url)).toBe(expected);
});

test('When url is given without pagination, then it should return the url unmodified', () => {
    const url = 'https://xy.com/route/lastroute';

    expect(request.removePaginationFromUrl(url)).toBe(url);
});

test('When url is given, then it returns the last route from url', () => {
    const url = 'https://xy.com/route/lastroute';
    const expected = 'lastroute';

    expect(request.getSearchQuery(url)).toBe(expected);
});

test('When url and page number is given, then it returns the url with page information', () => {
    const processedUrl = 'abcd';
    const page = 12;
    const expected = 'abcd?page=12';

    expect(request.appendPageToUrl({ processedUrl, page })).toBe(expected);
});

test('When url is given, then it returns processedUrl and searchQuery in an object', () => {
    const rawUrl = 'https://xy.com/route/lastroute?page=2';
    const processedUrl = 'abc/def';
    const searchQuery = 'xyz';
    const expected = {
        processedUrl,
        searchQuery
    };
    request.removePaginationFromUrl = jest.fn().mockReturnValue(processedUrl);
    request.getSearchQuery = jest.fn().mockReturnValue(searchQuery);

    expect(request.processUrl({ rawUrl })).toEqual(expected);
    expect(request.removePaginationFromUrl).toHaveBeenCalledWith(rawUrl);
    expect(request.getSearchQuery).toHaveBeenCalledWith(processedUrl);
});

test('When 0 entries are given, then it should return 1', () => {
    const count = 0;
    const expected = 1;

    expect(request.getTotalPages(count)).toBe(expected);
});

test('When 1 entries are given, then it should return 1', () => {
    const count = 1;
    const expected = 1;

    expect(request.getTotalPages(count)).toBe(expected);
});

test('When 101 entries are given, then it should return 6', () => {
    const count = 101;
    const expected = 6;

    expect(request.getTotalPages(count)).toBe(expected);
});
