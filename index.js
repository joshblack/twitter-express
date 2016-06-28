const express = require('express');
const faker = require('faker');

const server = express();

const tweets = [];

for (let i = 0; i < 20; i++) {
  tweets[i] = {
    body: faker.lorem.sentences(),
    author: {
      username: faker.internet.userName(),
      avatar: faker.internet.avatar(),
      email: faker.internet.email()
    }
  };
}

// RESTful API

// GET /tweets -> Get all the tweets
// GET /tweets/1 -> Get the tweet with the id of 1
// GET /tweets/new -> Display a form for making a new Tweet
// POST /tweets with { tweet } -> Make a new Tweet with the body
// GET /tweets/edit -> Display a form for editing a Tweet
// PUT /tweets/1 with { tweet }-> Edit a Tweet with the body
// DELETE /tweets/1 -> Delete a tweet

server.get('/', (req, res) => {
  res.json(tweets);
});

server.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
