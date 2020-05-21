// exports.respondWithName = (req, res) => {
//     let paramsName = req.params.animal
//     res.render("index", {name: paramsName});
// };

exports.respondWithGame = (req, res) => {
    let paramsGame = req.params.videogame
    res.render("index", {game: paramsGame})
}