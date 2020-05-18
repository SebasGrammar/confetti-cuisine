const port = 3000,
    express = require("express"),
    app = express()
    homeController = require("./controllers/homeController");

// app.get("/products/:shampoo", (req, res) => {
//     res.send("<h1>Shampoo</h1>")
// })


// this runs every time a request is made!

app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.json());

// app.post("/", (req, res) => {
//     console.log(req.body)
//     console.log(req.query)
//     res.send("POST SUCCESSFULL")
// })

// app.use((req, res, next) => {
//     console.log(`request made to ${req.url}`)
//     console.log(req.query)
//     next()
// })

// app.get("/products/:hair", (req, res) => {
//     let hair = req.params.hair
//     res.send(`<h1>this is the page for <h1 style="color: red">${hair}</h1><h1>`)
// })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})