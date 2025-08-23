/* START OF CODE SELF-WRITTEN */

const express = require("express");
const router = express.Router();
const moment = require('moment');
const authorizeUser = require("./authorizeUser");

/* 
    render new-article Page
    INPUT: user clicks on "Create a New Article" in Author Home Page
    OUTPUT:  new-article page rendered
*/
router.get('/new', authorizeUser, (req, res) => {
    res.render('new-article', {
        title: 'Create New Blog',
        name: "Pen Your Thoughts",
        heading: "Create Your Story Here",
        slot1: "Name Your Story",
        slot2: "Content",
        slot3: "Author Name",
        button1: "Create",
        button2: "Back to Blogs"
    });
});

/* 
    Create a new article (submit)
    INPUT: user fills the form and creates an article
    OUTPUT: data about the new blog is inserted in database
*/
router.post('/new', (req, res) => {
    const { title, content } = req.body;
    const created_at = moment().format('YYYY-MM-DD HH:mm:ss');
    const modified_at = moment().format('YYYY-MM-DD HH:mm:ss');
    const status = "rough";
    if (!title || !content) {
        return res.status(400).send("All Fields Are Required");
    }
    db.run("INSERT INTO blogs (title, content, author_name, status, created_at, published_at, last_modified) VALUES (?, ?, 'Vania Abbas', ?, ?, 'Not Published', ?)", [title, content, status, created_at, modified_at], function (err) {
        if (err) {
            return console.log(err.message);
        }
        console.log("Successfully added")
        res.redirect('/author/blogs');
    });
});

/* 
    Publish a new article (submit)
    INPUT: user clicks on the publish button in Author's Home Page
    OUTPUT: status is updated in the database from "rough" to "published"
*/
router.post('/:id', authorizeUser, (req, res) => {
    const id = req.params.id;
    const status = "published";
    const published_at = moment().format('YYYY-MM-DD HH:mm:ss');
    const query = 'UPDATE blogs SET status = ?, published_at = ? WHERE id = ?';

    db.run(query, [status, published_at, id], function (err) {
        if (err) {
            return console.log(err.message);
        }
        res.redirect('/author/blogs');
    });
});

/* 
    Render edit-article page 
    INPUT: user clicks on the publish button in Author's Home Page
    OUTPUT: status is updated in the database from "rough" to "published"
*/
router.get('/edit/:id', authorizeUser, (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM blogs WHERE id = ?", [id], (err, row) => {
        if (err) {
            return console.log(err.message);
        }
        res.render('edit-article', {
            title: 'Edit Article',
            name: "Pen Your Thoughts",
            nav1: "Home",
            heading: "Edit Article ",
            slot1: "Rename Your Blog",
            slot2: "Content",
            button1: "Save Changes",
            button2: "Back To Article's Home Page",
            blog: row
        });
    });
});

/* 
    Render edit-article page 
    INPUT: user clicks on the edit button in Author's Home Page
    OUTPUT: article with id in the req.params is updated in the database
*/
router.post('/edit/:id', (req, res) => {
    const { title, content } = req.body;
    const id = req.params.id;
    const modified_at = moment().format('YYYY-MM-DD HH:mm:ss');
    db.run("UPDATE blogs SET title = ?, content = ?, last_modified = ? WHERE id = ?", [title, content, modified_at, id], function (err) {
        if (err) {
            return console.log(err.message);
        }
        res.redirect('/author/blogs');
    });
});

/* 
    Delete Article
    INPUT: user clicks on the delete button in Author's Home Page
    OUTPUT: first comments for that article are delete, followed by likes, then dislikes, then views and finally the blog 
*/
router.post('/delete/:id', authorizeUser, (req, res) => {
    const id = req.params.id;

    // First deleting comments associated with the blog
    const deleteCommentsQuery = 'DELETE FROM comments WHERE blog_id = ?';
    db.run(deleteCommentsQuery, [id], function (err) {
        if (err) {
            return console.log(err.message);
        }
        // Then deleting likes associated with the blog
        const deleteLikesQuery = "DELETE FROM likes WHERE blog_id = ?";
        db.run(deleteLikesQuery, [id], function (err) {
            if (err) {
                return console.log(err.message);
            }

            // Then deleting dislikes associated with the blog
            const deleteDislikesQuery = "DELETE FROM dislikes WHERE blog_id = ?";
            db.run(deleteDislikesQuery, [id], function (err) {
                if (err) {
                    return console.log(err.message);
                }
                // then deleting reactions to the blog
                const deleteReactionsQuery = 'DELETE FROM reactions WHERE id = ?';
                db.run(deleteReactionsQuery, [id], function (err) {
                    if (err) {
                        return console.log(err.message);
                    }

                    // then deteing views 
                    const deleteViewsQuery = 'DELETE FROM views WHERE blog_id = ?';
                    db.run(deleteViewsQuery, [id], function (err) {
                        if (err) {
                            return console.log(err.message);
                        }

                        // then finally deleting the blog
                        const deleteBlogQuery = 'DELETE FROM blogs WHERE id = ?';
                        db.run(deleteBlogQuery, [id], function (err) {
                            if (err) {
                                return console.log(err.message);
                            }
                            else {
                                res.redirect('/author/blogs')
                            }

                        });
                    });
                });
            });
        });
    });
});

// Export the router object so index.js can access it
module.exports = router;

/* END OF CODE SELF-WRITTEN */
