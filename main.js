const {crawlPage} = require("./crawl.js");
const {printReport} = require("./report.js");

async function main(){
    let baseURL = "";
    if(process.argv.length != 3) {
        console.log("Usage: npm start baseURL");
        process.exit(1);
    }
    else{
        baseURL = process.argv[2];
        console.log("Starting crawler with baseURL: " + baseURL);
    }
    const pages = await crawlPage(baseURL,baseURL,{});
    printReport(pages);
}

main();