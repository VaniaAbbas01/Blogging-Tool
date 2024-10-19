/* START OF CODE SELF-WRITTEN */

    const express = require("express");
    const router = express.Router();
    const moment = require('moment');

    /* 
        Comment a blog (submit)
        INPUT: user fills the form and clicks on "add comment"
        OUTPUT: record added to the database - comments table
   */
    router.post('/:id', (req, res) => {
        const {comment, commenter_name } = req.body;
        const created_at = moment().format('YYYY-MM-DD HH:mm:ss');
        const id = req.params.id;
        console.log(id);
        db.get("INSERT INTO comments (comment, commenter_name, commented_at, blog_id) VALUES (?,?,?,?)" ,[comment, commenter_name, created_at, id], function(err)
        {
            if (err)
            {
                return console.log(err.message);
            }
            res.redirect('/reader/blogs/'+id);
        });
    });

    // Export the router object so index.js can access it
    module.exports = router

/* END OF CODE SELF-WRITTEN */