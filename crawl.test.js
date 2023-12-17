const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')
const { JSDOM } = require('jsdom');
const { getURLSFromHTML } = require('./crawl.js');


describe('normalizeURL tests', () => {
    test('normalizeURL with standard URL', () => {
        expect(normalizeURL('https://www.google.com')).toBe('www.google.com');
    });

    test('normalizeURL with trailing slash', () => {
        expect(normalizeURL('https://www.google.com/')).toBe('www.google.com');
    });

    test('normalizeURL with path', () => {
        expect(normalizeURL('https://www.google.com/search')).toBe('www.google.com/search');
    });

    test('normalizeURL with path and trailing slash', () => {
        expect(normalizeURL('https://www.google.com/search/')).toBe('www.google.com/search');
    });

    test('normalizeURL with subdomain', () => {
        expect(normalizeURL('https://blog.google.com')).toBe('blog.google.com');
    });

    test('normalizeURL with HTTP protocol', () => {
        expect(normalizeURL('http://www.google.com')).toBe('www.google.com');
    });

    test('normalizeURL without protocol', () => {
        expect(normalizeURL('www.google.com')).toBe('www.google.com');
    });

    test('normalizeURL with IP address', () => {
        expect(normalizeURL('https://192.168.1.1')).toBe('192.168.1.1');
    });
});


describe('getURLSFromHTML tests', () => {
    test('getURLSFromHTML with no links', () => {
        const htmlBody = '<html><body></body></html>';
        const baseURL = 'https://www.google.com';
        expect(getURLSFromHTML(htmlBody, baseURL)).toEqual([]);
    });

    test('getURLSFromHTML with one absolute link', () => {
        const htmlBody = '<html><body><a href="https://www.google.com/search"></a></body></html>';
        const baseURL = 'https://www.google.com';
        expect(getURLSFromHTML(htmlBody, baseURL)).toEqual(['https://www.google.com/search']);
    });

    test('getURLSFromHTML with one relative link', () => {
        const htmlBody = '<html><body><a href="/search"></a></body></html>';
        const baseURL = 'https://www.google.com';
        expect(getURLSFromHTML(htmlBody, baseURL)).toEqual(['https://www.google.com/search']);
    });

    test('getURLSFromHTML with multiple links', () => {
        const htmlBody = '<html><body><a href="https://www.google.com/search"></a><a href="/images"></a></body></html>';
        const baseURL = 'https://www.google.com';
        expect(getURLSFromHTML(htmlBody, baseURL)).toEqual(['https://www.google.com/search', 'https://www.google.com/images']);
    });

    test('getURLSFromHTML with non-matching links', () => {
        const htmlBody = '<html><body><a href="https://www.google.com/search"></a><a href="https://www.bing.com"></a></body></html>';
        const baseURL = 'https://www.google.com';
        expect(getURLSFromHTML(htmlBody, baseURL)).toEqual(['https://www.google.com/search']);
    });
});