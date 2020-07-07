const homeController = require("./controllers/homeController"),
    errorController = require("./controllers/errorController"),
    layouts = require("express-ejs-layouts");
//const {showCourses} = require("./controllers/homeController")

console.log(homeController) // Yes. all exported functions are included in an object. That object receives whatever name
// we give to it.
//console.log(showCourses)



const express = require("express"),
    app = express();

app.set("view engine", "ejs");
app.use(layouts)
app.use(express.static("public"))

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
    // res.send("Welcome to Confetti Cuisine!")
    res.render("index")
});


app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());


app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);


app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`)
});