const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function normalizeURL(url){
    url = new URL(url);
    let host = url.hostname;
    let path = url.pathname;
    if (typeof host !== 'string' || typeof path !== 'string') {
        throw new TypeError('Both hostname and pathname must be strings');
    }
    let new_url = host + path;
    if (new_url.endsWith("/")) {
        new_url = new_url.slice(0, -1);
    }
    return new_url;
}

function getURLSFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    let urls = [];
    let links = dom.window.document.querySelectorAll("a");
    for (let i = 0; i < links.length; i++) {
        let url = links[i].href;
        if (url.startsWith(baseURL)) {
            urls.push(url);
        }
        else if (url.startsWith("/")){
            urls.push(baseURL + url);
        }
    }
    return urls;
}

module.exports = {
    normalizeURL,
    getURLSFromHTML
  }
  