const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    app = http.createServer();

const getJSONString = obj => {
    return JSON.stringify(obj, null, 2);
};

const routesMap = {
    "/products": "<h1>These are all our products</h1>",
    "/aboutus": "<h1>We are your favourite online shop</h1>",
    "/partners": "<h1>These are our partners</h1>"
}

app.on("request", function (request, response) {
    response.writeHead(httpStatus.OK, {
        "Content-Type": "text/html"
    })

    let body = []

    request.on("data", (bodyData) => {
        body.push(bodyData)
    })
    request.on("end", () => {
        body = Buffer.concat(body).toString()
        console.log(`Request Body Contents: ${body}`);
    })

    if (routesMap[request.url] && request.url === "/products") {
        setTimeout(() => {
            response.end(routesMap[request.url])
        }, 2000)
    } else if (routesMap[request.url]) {
        response.end(routesMap[request.url])
    } else {
        response.end("<h1>Welcome</h1>")
    }
})

app.listen(port)
console.log("Server's running")