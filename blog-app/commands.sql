CREATE TABLE blogs (id SERIAL PRIMARY KEY, title text NOT NULL, author text, url text NOT NULL, likes int DEFAULT 0);
INSERT INTO blogs (title, author, url) VALUES ('Type wars', 'Robert C. Martin', 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html');
INSERT INTO blogs (title, author, url) VALUES ('TDD harms architecture', 'Michael Chan', 'https://reactpatterns.com/');

INSERT INTO users (username, name) VALUES ("kimtran@email.com", "Kim");
INSERT INTO blogs (title, author, url, year, user_id) VALUES ('TDD harms architecture', 'Michael Chan', 'https://reactpatterns.com/', 2021, 1);
INSERT INTO reading_list (blog_id, user_id, read) values(1, 1, false);