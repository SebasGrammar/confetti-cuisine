const trigger = require("./content")
// const {object} = require("./content")
const {outer: {ignore: outerFunction}} = require("./content")

console.log("Module running")
console.log(outerFunction)
console.log(trigger)