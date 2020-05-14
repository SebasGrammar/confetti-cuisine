const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    app = http.Server((request, response) => {
        console.log("Incoming request received.")
        console.log(typeof request)
        console.log(typeof response)
        response.writeHead(httpStatus.OK, {
            "Content-Type": "text/html"
        })

        // So this bit is only going to run when the client sends a request.

        let responseMessage = "<h1>Hello!!!</h1>"
        response.write(responseMessage);
        response.end()
        console.log(`Sent a response : ${responseMessage}`)
    });

console.log(typeof http)

app.listen(port);
console.log(`The server has started and is listening on port number:
    ➥ ${port}`);


