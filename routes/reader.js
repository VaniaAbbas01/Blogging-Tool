/* START OF CODE SELF-WRITTEN */

    const express = require("express");
    const router = express.Router();

    /* 
        Render Reader Home Page
        INPUT: user clicks on the reader route in the home page
        OUTPUT: reader home page rendered
   */
    router.get("/blogs", (req, res, next) => {
        // Define the query
        query = "SELECT * FROM blogs ORDER BY blogs.published_at DESC"

        // Execute the query and render the page with the results
        global.db.all(query, 
            function (err, rows) 
            {
                if (err) 
                {
                    next(err); //send the error on to the error handler
                } 
                else 
                {
                    res.render("reader-home", {title: "Reader's Page",
                                                blogs: rows,
                                                name: "Pen Your Thoughts",
                                                author: "Vania Abbas",
                                                sub_heading: "Readers' Home Page",
                                                button1: "Read More",
                                                }); // render blogs page
                    
                }
            }
        );
    });


    /* 
        Render Specific article page
        INPUT: user clicks on one of the articles in Reader Home Page
        OUTPUT: read-article page rendered
   */
    router.get("/blogs/:id", (req, res, next) => {
        const id = req.params.id;

        // Define the query for blogs
        query = "SELECT blogs.id, blogs.title, blogs.content, blogs.created_at, blogs.published_at, (SELECT COUNT(*) FROM likes WHERE blog_id = blogs.id) AS like_count, (SELECT COUNT(*) FROM dislikes WHERE blog_id = blogs.id) AS dislike_count FROM blogs WHERE id = ?";

        // Define the query for comments
        query_2 = "SELECT * FROM comments WHERE comments.blog_id = ? ORDER BY comments.commented_at DESC"

        // Define the query for views
        query_3 = "INSERT INTO views (blog_id) VALUES (?)";


        // Execute the query and render the page with the results
        global.db.get(query, [id],
            function (err, blog) 
            {
                if (err) 
                {
                    next(err); //send the error on to the error handler
                } 
                if (!blog)
                {
                    res.status(404).send("Blog NOt Found");
                }
                db.run(query_3, [id], function (err) 
                {
                    if (err)
                    {
                        return console.log(err.message);
                    }
    
                    db.all(query_2, [id], (err, comments) => {
                        if(err)
                        {
                            return console.log(err.emessage);
                        }
                        res.render('read-article', {name: "Pen Your Thoughts",
                                                    blog, 
                                                    comments,
                                                    slot1: "Write Your Comment Here",
                                                    slot2: "Name",
                                                    button1: "Add Comment",
                                                    button2: "Back To Articles",
                                                    button3: "Like",
                                                    button4: "Dislike"});
                    });    
                });
            });
    });



    // Export the router object so index.js can access it
    module.exports = router

/* END OF CODE SELF-WRITTEN */