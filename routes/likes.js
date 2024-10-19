
/* START OF CODE SELF-WRITTEN */

    const express = require("express");
    const router = express.Router();

    /* 
        Like a blog (submit)
        INPUT: user clicks like button
        OUTPUT: record added to the database - likes table
   */
    router.post('/:id', (req, res) => {
        const id = req.params.id;
        db.get("INSERT INTO likes (blog_id) VALUES (?)" ,[id],function(err)
        {
            if (err)
            {
                return console.log(err.message);
            }
            console.log("successfully liked");
            res.redirect('/reader/blogs/'+id);
        });
    });

    // Export the router object so index.js can access it
    module.exports = router;

/* END OF CODE SELF-WRITTEN */