/* START OF CODE SELF-WRITTEN */

const express = require("express");
const router = express.Router();
const authorizeUser = require("./authorizeUser");

/* 
    render Author Home Page
    INPUT: user chooses author route in the home page
    OUTPUT: Author home page rendered
*/
router.get("/blogs", authorizeUser, (req, res, next) => {
    const id = req.id;
    // Define the query
    const query = `SELECT blogs.id, blogs.title,
     blogs.content, blogs.created_at, blogs.published_at, blogs.last_modified, blogs.status, 
     (SELECT COUNT(*) FROM likes WHERE blog_id = blogs.id) AS like_count, 
     (SELECT COUNT(*) FROM dislikes WHERE blog_id = blogs.id) AS dislike_count, 
     (SELECT COUNT(*) FROM comments WHERE blog_id = blogs.id) AS comment_count, 
     (SELECT COUNT(*) FROM views WHERE blog_id = blogs.id) AS views_count 
     FROM blogs WHERE blogs.user_id = ? ORDER BY blogs.created_at DESC;`
    // Execute the query and render the page with the results
    global.db.all(query, [id],
        function (err, rows) {
            if (err) {
                next(err); //send the error on to the error handler
            }
            else {
                res.render("author-home", { blogs: rows }); // render blogs page
            }
        }
    );
});

/* 
    render Author Settings Page
    INPUT: user clicks on settings page in Author Home Page
    OUTPUT: Author Settings page rendered
*/
router.get("/settings", (req, res, next) => {
    res.render("author-settings", {
        title: "Author's Page",
        name: "Pen Your Thoughts",
        heading: "Author's Settings Page",
        slot1: "Author Name",
        slot2: "Blog Title",
        button1: "Submit Settings",
        button2: "Back To Author Home Page"
    });
});


// Export the router object so index.js can access it
module.exports = router;

/* END OF CODE SELF-WRITTEN */
