const fs = require("fs"),
    httpStatusCodes = require("http-status-codes"),
    contentTypes = require("./contentTypes");

module.exports = {
    getFile(file, res) {
        fs.readFile(`./${file}`, (error, data) => {
            if (error) {
                res.writeHead(httpStatusCodes.INTERNAL_SERVER_ERROR, contentTypes.html)
                res.end("It was not possible to load the content.")
            }
            res.end(data)
        })
    }
}