const port = 3000,
    express = require("express")
app = express();

app.post("/", (req, res) => {
    res.send("<h1>Hello</h1>")

    console.log(req.params);
    console.log(req.body);
    console.log(req.url);
    console.log(req.query);
})

app.get("/greetings", (req, res) => {
    res.send("<h1>HELLO, WELCOME</h1>")
    console.log(req.url)
})

app.listen(port, () => {
    console.log(`The Express server is running on port ${port}`)
})

// class Dog {
//     constructor(name) {
//         this.name = name
//     }
// }

// console.log(express)
// console.log(typeof express)


// console.log(Dog)
// console.log(typeof Dog)
