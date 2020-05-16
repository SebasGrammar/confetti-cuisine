const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    fs = require("fs");

const routeMap = {
    "/": "views/index.html"
}

function getURL(url) {

    if (url !== "/") {
        return `views${url}.html`;
    } else {
        return `views/index.html`
    }
}

app = http.createServer(function (request, response) {
    // console.log(this) this -> http object // Arrow function -> this -> global object. 

    let url = getURL(request.url)
    console.log(request.url)

    // if (routeMap[request.url]) {
    //     fs.readFile(routeMap[request.url], (error, data) => {
    //         // console.log(this) // Hay buen material aquí para experimentar with the this keyword.
    //         response.write(data)
    //         response.end()
    //     });
    // } 

    fs.readFile(url, (error, data) => {
        if (error) {
            response.writeHead(httpStatus.NOT_FOUND)
            response.write("<h1>FILE NOT FOUND</h1>")
        } else {
            response.writeHead(httpStatus.OK, {
                "Content-Type": "text/html"
            })
            console.log(data)
            response.write(data)
        }
        response.end()
    })

})

app.listen(port)
console.log("app is listening")