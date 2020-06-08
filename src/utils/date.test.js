const date = require('./date');

const mockDate = new Date(Date.now());

test('When getTimestamp is called then the current date is returned as Date object', () => {
    global.Date.now = jest.fn().mockReturnValue(mockDate);
    expect(date.getTimestamp()).toEqual(mockDate);
});

test('When getISODate is called then current date is returned as date ISO string', () => {
    const expected = mockDate.toISOString();
    date.getTimestamp = jest.fn().mockReturnValue(mockDate);
    expect(date.getISODate()).toBe(expected);
});
