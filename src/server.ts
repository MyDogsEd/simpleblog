import express, {Request, Response} from "express";
import { engine } from "express-handlebars";
import path from "path";

// Variable to hold all of the posts
var posts: Map<Number, Post> = new Map();
var newID = 1;

// Configure Express
const app = express();
const port = 3000;

app.set('views', path.join(__dirname, '../templates'))

// Configure the handlebars engine
app.engine("hbs", engine({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, '../templates/layouts'),
    partialsDir: path.join(__dirname, '../templates/partials'),
}));

app.set("view engine", "hbs")

// make sure that json is being used to format request bodies
app.use(express.json());




// HTTP Routes 

app.get('/', (req: Request, res: Response) => {
    res.render('home', {
        postList: Array.from(posts.values()) 
    })
})

// Redirect to homepage if no post ID is given\
app.get('/posts', (req: Request, res: Response) => {
    res.redirect("../")
})

// Display a specific post ID
app.get('/posts/:id', (req: Request, res: Response) => {
    res.render('posts')
})

// Add a new post
app.post('/add', (req: Request, res: Response) => {
    console.log("POST Request to add a post recieved")
    var postid;
    try {
        var newPost: Post = {
            id: newID,
            title: req.body.title,
            content: req.body.content,
            timestamp: Date.now().toLocaleString(),
            author: req.body.author
        } 
        posts.set(newID, newPost)
        postid = newPost.id;
        newID++
    } catch {
        res.status(500).send("Error");
        return;
    }
    res.status(200).json(posts.get(postid))
})


// Start the express server
app.listen(port, () => { 
    console.log("Express server now running")
})


// interface for post type
interface Post {
    id: Number
    title: String
    content: String
    timestamp: String
    author: String

}