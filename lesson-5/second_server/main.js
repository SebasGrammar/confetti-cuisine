const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    app = http.createServer();

// app.on("request", (request, response) => {
//     console.log(this) // this, arrow function -> global object
//     response.writeHead(httpStatus.OK, {
//         "Content-Type": "text/html"
//     })

//     let responseMessage = "<h1>It's running</h1>"
//     response.end(responseMessage)
// })

const getJSONString = obj => {
    return JSON.stringify(obj, null, 2);
};

app.on("request", function (request, response) {
    // console.log(this) // this, function -> app
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



    //console.log(`URL: ${getJSONString(request.url)}`)
    console.log(request.url)
    console.log(`METHOD: ${getJSONString(request.method)}`)
    // console.log(`HEADERS: ${getJSONString(request.headers)}`)
    console.log(request.headers.host)

    let responseMessage = "<h1>It's running</h1>"
    response.end(responseMessage)
})

app.listen(port)
console.log("Server's running")