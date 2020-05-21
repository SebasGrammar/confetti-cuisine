const httpStatusCodes = require("http-status-codes");

// exports.logErrors = (error, req, res, next) => {
//     console.log("N")
//     console.error(error.stack)
//     next(error)
// }

// exports.respondNoResourceFound = (req, res) => {
//     let errorCode = httpStatus.NOT_FOUND;
//     res.status(errorCode);
//     res.send(`${errorCode} | The page does not exist!`);
// };

exports.respondNoResourceFound = (req, res) => {
    let errorCode = httpStatusCodes.NOT_FOUND;
    res.status(errorCode);
    // res.sendFile(`./public/${errorCode}.html`, {
    //     root: "./"
    // });
    res.sendFile(`./views/${errorCode}.html`, {
        root: "./"
    });
};

exports.respondInternalError = (error, req, res, next) => {
    let errorCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
    console.log(`ERROR occurred: ${error.stack}`)
    res.status(errorCode);
    res.send(`${errorCode} | Sorry, our application is
    ➥experiencing a problem!`);
};