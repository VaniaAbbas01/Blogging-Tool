/**
* index.js
* This is your main app entry point
*/

// Set up express, bodyparser and EJS
const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // set the app to use ejs for rendering
app.use(express.static(__dirname + '/public')); // set location of static files

// Set up SQLite
// Items in the global namespace are accessible throught out the node application
const sqlite3 = require('sqlite3').verbose();
global.db = new sqlite3.Database('./database.db', function (err) {
    if (err) {
        console.error(err);
        process.exit(1); // bail out we can't connect to the DB
    } else {
        console.log("Database connected");
        global.db.run("PRAGMA foreign_keys=ON"); // tell SQLite to pay attention to foreign key constraints
    }
});

// Handle requests to the home page 
app.get('/', (req, res) => {
    res.render('index');
});

/* START OF SELF-WRITTEN CODE */

// Add all the route handlers in authorize to the app under the path /authorize
const authorizeRoutes = require('./routes/authorize');
// anything that begins with "authorize" go to the authorize file
app.use('/authorize', authorizeRoutes);

// Add all the route handlers in readerRoutes to the app under the path /reader
const readerRoutes = require('./routes/reader');
// anything that begins with "reader" go to the reader file
app.use('/reader', readerRoutes);

// Add all the route handlers in authorRoutes to the app under the path /author
const auhtorRoutes = require('./routes/author');
// anything that begins with "authors" go to the author file
app.use('/author', auhtorRoutes);

// Add all the route handlers in blogRoutes to the app under the path /blogs
const blogRoutes = require('./routes/blogs');
// anything that begins with "blogs" go to the blogs file
app.use('/blogs', blogRoutes);

// Add all the route handlers in comment to the app under the path /comments
const commentRoutes = require('./routes/comments');
// anything that begins with "comments" go to the comments file
app.use('/comments', commentRoutes);

// Add all the route handlers in likes to the app under the path /likes
const likesRoutes = require('./routes/likes');
// anything that begins with "likes" go to the likes file
app.use('/likes', likesRoutes);

// Add all the route handlers in dislikes to the app under the path /dislikes
const dislikesRoutes = require('./routes/dislikes');
// anything that begins with "dislikes" go to the dislikes file
app.use('/dislikes', dislikesRoutes);

// Add all the route handlers in reactions to the app under the path /reactions
const reactionsRoutes = require('./routes/reactions');
// anything that begins with "reactions" go to the dislikes file
app.use('/reactions', reactionsRoutes);

/* END OF SELF-WRITTEN CODE */








// Make the web application listen for HTTP requests
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

