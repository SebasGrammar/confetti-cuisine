const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    app = http.Server((request, response) => {
        console.log("Incoming request received.")
        response.writeHead(httpStatus.OK, {
            "Content-Type": "text/html"
        })

        let responseMessage = "<h1>Hello!!!</h1>"
        response.write(responseMessage);
        response.end()
        console.log(`Sent a response : ${responseMessage}`)
    });
    // app = http.Server(function (request, response) {
    //     console.log("Incoming request received.")
    //     response.writeHead(httpStatus.OK, {
    //         "Content-Type": "text/html"
    //     })

    //     console.log(response)

    //     let responseMessage = "<h1>Hello, Universe!</h1>";
    //     response.write(responseMessage);
    //     response.end();
    //     console.log(`Sent a response : ${responseMessage}`);
    // });
app.listen(port);
console.log(`The server has started and is listening on port number:
    ➥ ${port}`);


    // app = http.Server((request, response) => {

    // })

// console.log(http)