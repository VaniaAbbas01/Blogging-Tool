/* START OF CODE SELF-WRITTEN */

    const express = require("express");
    const router = express.Router();

   /* 
        Dislike a blog (submit)
        INPUT: user clicks dislike button
        OUTPUT: record added to the database - dislikes table
   */
    router.post('/:id', (req, res) => {
        const id = req.params.id;
        db.get("INSERT INTO dislikes (blog_id) VALUES (?)" ,[id], (err) => {
            if (err)
            {
                return console.log(err.message);
            }
            res.redirect('/reader/blogs/'+id);
        });
    });

    // Export the router object so index.js can access it
    module.exports = router;

/* END OF CODE SELF-WRITTEN */