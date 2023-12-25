const { test, expect } = require('@jest/globals');
const { sortPages } = require('./report.js');

describe('sortPages tests', () => {
    test('sortPages with empty object', () => {
        const pages = {};
        expect(sortPages(pages)).toEqual([]);
    });

    test('sortPages with one page', () => {
        const pages = { 'www.google.com': 1 };
        expect(sortPages(pages)).toEqual([['www.google.com', 1]]);
    });

    test('sortPages with multiple pages', () => {
        const pages = { 'www.google.com': 1, 'www.bing.com': 2, 'www.yahoo.com': 3 };
        expect(sortPages(pages)).toEqual([['www.yahoo.com', 3], ['www.bing.com', 2], ['www.google.com', 1]]);
    });

    test('sortPages with pages having same count', () => {
        const pages = { 'www.google.com': 1, 'www.bing.com': 1, 'www.yahoo.com': 1 };
        const sortedPages = sortPages(pages);
        // Since JavaScript's sort function is not stable, we can't predict the order of elements with equal values.
        // So we just check that the sorted array contains all the elements.
        expect(sortedPages).toContainEqual(['www.google.com', 1]);
        expect(sortedPages).toContainEqual(['www.bing.com', 1]);
        expect(sortedPages).toContainEqual(['www.yahoo.com', 1]);
    });
});