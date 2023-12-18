function main(){
    if(process.argv.length != 3) {
        console.log("Usage: npm start baseURL");
        process.exit(1);
    }
    else{
        let baseURL = process.argv[2];
        console.log("Starting crawler with baseURL: " + baseURL);
    }
}

main();