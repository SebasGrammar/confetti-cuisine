"use strict"
function namedFunction() {
	console.log("named function")
	console.log(this)
}

let arrow = () => {
	console.log(this)
}


console.log("named")
namedFunction()

console.log("arrow")
arrow()