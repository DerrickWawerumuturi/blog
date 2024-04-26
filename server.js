import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

//listening
const app =  express();
const port =  5000;
const API_URL = "http://localhost:6000";


app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// render homepage
app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/posts`);
        res.render("index.ejs", {posts: response.data});
    } catch (error) {
        res.status(505).json({message : "Error fetching posts"});
    }
})

// route to the edit page
app.get("/new", (req, res) => {
    res.render("edit.ejs", {heading : "New Post", submit: "Create Post"});
})

app.get("/edit/:id", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
        res.render("edit.ejs", {
            heading: "Edit Post",
            submit: "Update Post",
            post: response.data,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching post"});
    }
})

// new post
app.post("/api/posts", async (req, res) => {
    try {
        const response = await axios.post(API_URL + "/posts", req.body);
        console.log(response.data);
        res.redirect("/");
    } catch (error) {
        res.status(500).json( {message: 'error creating post'})
    }
});

// edit post
app.post("/api/posts/:id", async (req, res) => {
    try {
        const response = await axios.patch(API_URL + `/posts/${req.params.id}`);
        res.redirect("/");
    } catch (error) {
        res.status(500).json({message : 'Error editing post'});
    }
})

// delete post
app.get("/api/post/delete/:id", async (req, res) => {
    try {
        const response = await axios.delete(`${API_URL}/posts/${req.params.id}`);
        res.redirect("/"); 
    } catch (error) {
        res.status(500).json( {message: "Error deleting post"})
    }
    
})


app.get("/about", (req, res) => {
    res.render("about.ejs");
})

app.listen(port, () => {
  console.log(`Backend is listening on http://localhost:${port}`);  
})


