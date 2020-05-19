const port = 3000,
    express = require("express"),
    app = express(),
    homeController = require("./controllers/homeController"),
    layouts = require("express-ejs-layouts");

    
console.log(homeController)
app.set("view engine", "ejs")

app.use(layouts)

// app.get("/name/:animal", homeController.respondWithName)

app.get("/game/:videogame", homeController.respondWithGame)

app.listen(port, () => {
    console.log(`The server is listening on port ${port}`)
})