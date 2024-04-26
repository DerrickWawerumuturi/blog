import express from "express";
import bodyParser from "body-parser";

const app =  express();
const port =  6000;


let posts = [
    {
        id : 1,
        title: "Introduction to Javascript",
        content: "This blog gives a intorduction into language javascript\
        (my favourite so far) and explains everyhting in the basics and what\
        it is used for",
        date: new Date(),
        author: "Derrick Muturi",
    },

    {
        id : 2,
        title: "Python: OOP",
        content: "What are classes you may ask? Believe it or not almost everything\
        in Python is an object. A class is like a blueprint of how all the objects (instances)\
        should look like",
        date: new Date(),
        author: "Derrick Muturi",
    },

    {
        id : 3,
        title: "Python: Data Strucutures and Algorithms",
        content: "Almost every technical part of interviews is about data structures and\
        algorithsm, for a good reason.So what are algorithms then and why are they so much emphasised everywhere",
        date: new Date(),
        author: "Derrick Muturi",
    },

    {
        id: 4,
        title: "Python.DSA: Heaps",
        content: "Almost every technical part of interviews is about data structures and\
        algorithsm, for a good reason.So what are algorithms then and why are they so much emphasised everywhere",
        date: new Date(),
        author: "Derrick Muturi",
    },

    {
        id: 5,
        title: "Python.DSA: Stacks",
        content: "Almost every technical part of interviews is about data structures and\
        algorithsm, for a good reason.So what are algorithms then and why are they so much emphasised everywhere",
        date: new Date(),
        author: "Derrick Muturi",
    },

    {
        id: 6,
        title: "Python.DSA: Queues",
        content: "Almost every technical part of interviews is about data structures and\
        algorithsm, for a good reason.So what are algorithms then and why are they so much emphasised everywhere",
        date: new Date(),
        author: "Derrick Muturi",
    }
]

let lastId = 6;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//getting all posts
app.get("/posts", (req, res) => {
    res.json(posts);
});

//getting a specific post
app.get("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const searchId = posts.findIndex((post) => post.id === id);
    const requirePost =  posts[id];
    if (searchId > -1) {
        res.json(requirePost);
    } else {
        res
            .status(404)
            .json("No such post");
    }
})


// getting a new post
app.post("/posts", (req, res) => {
    const id =  lastId + 1;
    const newPost = {
        id: id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        date: new Date()
    }

    posts.push(newPost);
    lastId = id;
    res.status(201).json(newPost);

})

// editing post
app.patch("/posts/:id", (req, res) => {
    const id  = parseInt(req.params.id);
    const searchId = posts.findIndex((post) => post.id === id);
    const oldPost = posts[id];
    if (searchId > -1) {
        const newPost = {
            id: id,
            title : req.body.title || oldPost.title,
            content: req.body.content || oldPost.content,
            author: req.body.author || oldPost.author,
            date: new Date()
        }
        posts[id] = newPost;
        res.json(newPost);
    } else {
        res
            .status(500)
            .json({message: 'Could not edit post'});
    }
});


app.delete("/posts/:id", (req, res) => {
    const id  = parseInt(req.params.id);
    const searchId = posts.findIndex((post) => post.id === id);
    if (searchId > -1) {
        posts.splice(searchId, 1);
        res.json( {message: "post deleted"});
    } else {
        return res
            .status(404)
            .json( {message: "Post does not exist"})
    }
})


app.listen(port, () => {
  console.log(`Api is listening on http://localhost:${port}`);  
})