// In node js we can read and write files within the machine but not when we use js in the browser.
// Reading and writing files in a blocking/ synchronous way.
const fs = require("fs"); // common js module for file systems
const http = require("http"); // common js module for creating a web server.
const url = require("url");
const slugify = require('slugify') // importing the slugify module.
const replacetemplate = require('./modules/replacetemplate')
// const read = fs.readFileSync("./txt/input.txt", "utf-8");
// const textout = `This is what we know about the avocado : ${read} \n created in ${Date(Date.now()
// )}`;
// const write = fs.writeFileSync("./txt/output.txt", `${textout}`);
// // non-blocking asynchronous way of reading and writing files in node-js.
// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   // console.log(data)
// });
// fs.writeFile("./txt/start.txt", `${textout}`, (err, data) => {
//   // console.log(data)
// });
// call-back hell
// fs.readFile("./txt/input.txt", "utf-8", (err, data1) => {
// fs.readFile(`./txt/read-this.txt`, "utf-8", (err, data2) => {
//     fs.readFile("./txt/start.txt", "utf-8", (err, data3) => {
//     fs.writeFile(
//         "./txt/harun.txt",
//         `${data1}\n${data2}\n${data3}`,
//         "utf-8",
//         (err) => {
//         console.log("harun.txt file is created!!");
//         }
//     );
//     });
// });
// });
// reading the html file contents.
const overview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8')
const product = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8') 
const card = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8')
// building a simple api using our product data.
    // since it is excuted once in a synchronous way it is better to be placed first rather than in a function.
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')


// the data we read from the json file is returned as a string and to convert it into json
const productdata = JSON.parse(data)

// const slugs = productdata.map(el => slugify(el.productName, {lower: true})); the package doesn't understand amharic letters

const server = http.createServer((req, res) => {
  // implementing routing
    // const pathname = req.url
    const {query , pathname} = url.parse(req.url, true)
    // overview page
    if (pathname == "/" || pathname == "/overview") {
        // telling the browser we are sending a json data
        res.writeHead(200, {
            "Content-Type": "text/html"
        })
        const result =  productdata.map(el => replacetemplate(card, el)).join()
        const output = overview.replace('{@card}' , result)
        res.end(output)
    }
    // product page
    else if (pathname == "/product") {
        const selectedproduct = productdata[query.id]
        res.writeHead(200, {
            "Content-Type": "text/html"
        })
        const output = replacetemplate(product, selectedproduct)
        res.end(output)
    }

    // api
    else if(pathname == "/api"){
        // telling the browser we are sending a json data
    res.writeHead(200, {
        "Content-Type": "application/json"
    })
    // can access the data variable because of the scope chain.
    res.end(data)
    }

    // page not found.
    else {
        // defining the resonse header for the error
        res.writeHead(404 , {
            'Content-Type': 'text/html',
            'harun': 'hariyebk'
        })
        res.end("<h2> 404: Page not found </h2>");
    }
});
// listening to incoming requests from the localhost at port 8080
server.listen(8080, "127.0.0.1", () => {
  console.log("listening to requests at port 8080 !!"); // a message to signal that a server has been created and it's listening.
});
