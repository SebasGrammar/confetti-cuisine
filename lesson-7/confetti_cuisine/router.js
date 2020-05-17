const httpStatusCodes = require("http-status-codes"),
    utils = require("./utils"),
    contentTypes = require("./contentTypes");

const routes = {
    "GET": {

    },
    "POST": {

    }
}

exports.handle = (req, res) => {
    try {
        routes[req.method][req.url](req, res)
    } catch (e) {
        res.writeHead(httpStatusCodes.OK, contentTypes.html)
        utils.getFile("views/error.html", res)
    }
}

exports.get = (url, action) => {
    routes["GET"][url] = action
}

exports.post = (url, action) => {
    routes["POST"][url] = action
}