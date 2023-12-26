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


function getURLSFromHTML(htmlBody, currentURL) {
    const dom = new JSDOM(htmlBody);
    let urls = [];
    let links = dom.window.document.querySelectorAll("a");
    for (let i = 0; i < links.length; i++) {
        let url = links[i].href;
        if (url.startsWith(currentURL)) {
            urls.push(url);
        }
        else if (url.startsWith("/")){
            urls.push(currentURL + url);
        }
    }
    return urls;
}


async function crawlPage(baseURL,currentURL,pages){
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);
    if (baseURLObj.hostname != currentURLObj.hostname) {
        return pages;
    }

    normalizedCurrentURL = normalizeURL(currentURL);
    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL] += 1;
        return pages;
    }

    pages[normalizedCurrentURL] = 1;

    console.log(`actively crawling : ${currentURL}`);

    try{
        const response = await fetch(currentURL);
        if(response.ok == false){
            throw new Error("Bad response");
        }
        if(response.headers.get("Content-Type").indexOf("text/html") == -1) {
            throw new Error("Not HTML");
        }

        const htmlBody = await response.text();
        const urls = getURLSFromHTML(htmlBody, baseURL);

        for(const url of urls){
            pages = await crawlPage(baseURL,url,pages);
        }
    }
    catch(error){
        console.log(error);
    }
    return pages;
}


module.exports = {
    normalizeURL,
    getURLSFromHTML,
    crawlPage
  }
  