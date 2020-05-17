const port = 3000,
    http = require("http"),
    httpStatusCodes = require("http-status-codes"),
    router = require("./router"),
    fs = require("fs");

const contentTypes = {
    html: {
        "Content-Type": "text/html"
    },
    plain: {
        "Content-Type": "text/plain"
    }
}

const customReadFile = (file, res) => {
    fs.readFile(`./${file}`, (errors, data) => {
        if (errors) {
            console.log("Error reading the file")
        }
        res.end(data)
    })

};

const sendErrorResponse = res => {
    res.writeHead(httpStatus.NOT_FOUND, {
        "Content-Type": "text/html"
    });
    res.write("<h1>File Not Found!</h1>");
    res.end();
};

router.get("/", (req, res) => {
    res.writeHead(httpStatusCodes.OK, contentTypes.plain);
    res.end("INDEX");
});

router.get("/index.html", (req, res) => {
    res.writeHead(httpStatusCodes.OK, contentTypes.html);
    customReadFile("views/index.html", res);
});

router.get("/contact.html", (req, res) => {
    res.writeHead(httpStatusCodes.OK, contentTypes.html);
    customReadFile("views/contact.html", res)
});

router.post("/", (req, res) => {
    res.writeHead(httpStatusCodes.OK, plainTextContentType);
    res.end("POSTED");
});

http.createServer(router.handle).listen(3000);
console.log(`The server is listening on port number: ➥ ${port}`);

// http
//     .createServer((req, res) => {
//         let url = req.url;
//         if (url.indexOf(".html") !== -1) {
//             res.writeHead(httpStatus.OK, {
//                 "Content-Type": "text/html"
//             });
//             customReadFile(`./views${url}`, res);
//         } else if (url.indexOf(".js") !== -1) {
//             res.writeHead(httpStatus.OK, {
//                 "Content-Type": "text/javascript"
//             });
//             customReadFile(`./public/js${url}`, res);
//         } else if (url.indexOf(".css") !== -1) {
//             res.writeHead(httpStatus.OK, {
//                 "Content-Type": "text/css"
//             });
//             customReadFile(`./public/css${url}`, res);
//         } else if (url.indexOf(".png") !== -1) {
//             res.writeHead(httpStatus.OK, {
//                 "Content-Type": "image/png"
//             });
//             customReadFile(`./public/images${url}`, res);
//         } else {
//             sendErrorResponse(res);
//         }
//     })
//     .listen(3000);
// console.log(`The server is listening on port number: ${port}`);

// const customReadFile = (file_path, res) => {
//     if (fs.existsSync(file_path)) {
//         fs.readFile(file_path, (error, data) => {
//             if (error) {
//                 console.log(error);
//                 sendErrorResponse(res);
//                 return;
//             }
//             res.write(data);
//             res.end();
//         });
//     } else {
//         sendErrorResponse(res);
//     }
// };