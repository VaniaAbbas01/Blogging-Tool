
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

-- Create your tables with SQL commands here (watch out for slight syntactical differences with SQLite vs MySQL)

/* START OF SELF WRITTEN TABLES  */
    CREATE TABLE IF NOT EXISTS blogs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('rough', 'published')),
        author_name TEXT NOT NULL,
        created_at TEXT NOT NULL,
        published_at TEXT NOT NULL,
        last_modified TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS views (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        blog_id INTEGER,
        FOREIGN KEY (blog_id) REFERENCES blogs(id)
    );

    CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        blog_id INTEGER,
        comment TEXT NOT NULL,
        commenter_name TEXT NOT NULL,
        commented_at TEXT NOT NULL,
        FOREIGN KEY (blog_id) REFERENCES blogs(id)
    );

    CREATE TABLE IF NOT EXISTS likes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        blog_id INTEGER,
        FOREIGN KEY (blog_id) REFERENCES blogs(id)
    );

    CREATE TABLE IF NOT EXISTS dislikes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        blog_id INTEGER,
        FOREIGN KEY (blog_id) REFERENCES blogs(id)
    );

    CREATE TABLE IF NOT EXISTS reactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        blog_id INTEGER,
        reaction_type TEXT NOT NULL,
        FOREIGN KEY (blog_id) REFERENCES blogs(id)
    );
/* END OF SELF WRITTEN TABLES  */


COMMIT;

