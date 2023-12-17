const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

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