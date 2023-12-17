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

console.log(normalizeURL(new URL("https://www.google.com")))

module.exports = {
    normalizeURL
  }
  