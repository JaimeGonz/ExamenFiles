const { response } = require("express");
const express = require("express");
const { add } = require("lodash");
const texts = require("./texts.js")

// Permite crear el servidor web
// Crea un objeto app que representa mi app web mediante un servidor
const app = express();

// Definir puerto de escucha
const port = 3000;

// Definir motor de plantillas
app.set("view engine", "ejs")
//app.use(express.static(__dirname+"/views"))

app.use(express.static("public"))

app.get("/" , function(request, response){
    // response.send("¡Hola mundo!")
    response.render("index")
})

// Middleware de express para extraer valores del body de petición HTML.
app.use(express.urlencoded({
    extended : true 
}));


app.listen(port, function(){
    console.log("Listening at http://localhost:3000")
})

app.get("/add", function(request, response){
    response.render("add")
})

app.get("/search", function(request, response){
    response.render("search")
})

app.post("/add", function(request, response){
    const title = request.body.title
    const body = request.body.body
    texts.addTextDoc(title, body)
    response.redirect("/view")
})

app.post("/search", function(request, response){
    const title = request.body.title;
    const content = texts.showDoc(title);
    response.render("search", {
        title : title,
        text : content
    })
})

app.get("/view", function(req, res){
    const files = texts.allDocs()
    res.render("view", {
        files : files
    })
})

app.get("/edit/:title", function(req, res){
    const title = req.params.title
    const content = texts.showDoc(title)
    res.render("edit", {
        title : title,
        text : content
    })
})

app.post("/edit", function(req, res){
    const title = req.body.title
    const ntitle = req.body.ntitle
    const nbody = req.body.nbody
    texts.modify(title, ntitle, nbody)
    res.redirect("/view")
})

app.get("/remove/:title", function(req, res){
    const title = req.params.title
    texts.erase(title)
    res.redirect("/view")
})