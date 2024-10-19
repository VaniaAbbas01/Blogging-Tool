/* START OF CODE SELF-WRITTEN */

    const express = require("express");
    const router = express.Router();

    /* 
        React to a blog (submit)
        INPUT: user clicks any of the emojis 
        OUTPUT: record added to the database - reactions table
    */
    router.post('/:id', (req, res) => {
        const id = req.params.id;
        const {reaction} = req.body;
        db.get("INSERT INTO reactions (blog_id, reaction_type) VALUES (?, ?)" ,[reaction, id],function(err)
        {
            if (err)
            {
                return console.log(err.message);
            }
            console.log("successfully reacted");
            res.redirect('/reader/blogs/'+id);
        });
    });

    // Export the router object so index.js can access it
    module.exports = router;

/* END OF CODE SELF-WRITTEN */