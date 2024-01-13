CREATE DATABASE todoapp;

CREATE TABLE todos1(
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(30),
    progress INT,
    date VARCHAR(300)
);


CREATE TABLE users(
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)

);

INSERT INTO todos (id,user_email,title,progress,date) VALUES ('0','abhishek@gmail.com','Todo',100,'Wednesday, 10 January 2024');