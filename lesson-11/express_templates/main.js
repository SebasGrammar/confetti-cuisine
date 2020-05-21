const port = 3000,
    express = require("express"),
    app = express(),
    homeController = require("./controllers/homeController"),
    errorController = require("./controllers/errorController"),
    layouts = require("express-ejs-layouts");


app.set("view engine", "ejs")

app.use(express.static("views"))

app.use(layouts)

// app.get("/name/:animal", homeController.respondWithName)

app.get("/game/:videogame", homeController.respondWithGame)


// app.use(errorController.logErrors)
app.use(errorController.respondNoResourceFound);
// app.use(errorController.respondInternalError);

app.listen(port, () => {
    console.log(`The server is listening on port ${port}`)
})