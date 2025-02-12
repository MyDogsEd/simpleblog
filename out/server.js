"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = require("express-handlebars");
const path_1 = __importDefault(require("path"));
// Variable to hold all of the posts
var posts = new Map();
var newID = 1;
// Configure Express
const app = (0, express_1.default)();
const port = 3000;
app.set('views', path_1.default.join(__dirname, '../templates'));
// Configure the handlebars engine
app.engine("hbs", (0, express_handlebars_1.engine)({
    extname: 'hbs',
    layoutsDir: path_1.default.join(__dirname, '../templates/layouts'),
    partialsDir: path_1.default.join(__dirname, '../templates/partials'),
}));
app.set("view engine", "hbs");
// make sure that json is being used to format request bodies
app.use(express_1.default.json());
// HTTP Routes 
app.get('/', (req, res) => {
    res.render('home', {
        postList: Array.from(posts.values())
    });
});
// Redirect to homepage if no post ID is given\
app.get('/posts', (req, res) => {
    res.redirect("../");
});
// Display a specific post ID
app.get('/posts/:id', (req, res) => {
    res.render('posts');
});
// Add a new post
app.post('/add', (req, res) => {
    console.log("POST Request to add a post recieved");
    var postid;
    try {
        var newPost = {
            id: newID,
            title: req.body.title,
            content: req.body.content,
            timestamp: Date.now().toLocaleString(),
            author: req.body.author
        };
        posts.set(newID, newPost);
        postid = newPost.id;
        newID++;
    }
    catch (_a) {
        res.status(500).send("Error");
        return;
    }
    res.status(200).json(posts.get(postid));
});
// Start the express server
app.listen(port, () => {
    console.log("Express server now running");
});
