const express = require('express');
const bodyParser = require('body-parser');
const faker = require('faker');

const server = express();
const tweets = [];

for (let i = 0; i < 20; i++) {
  tweets[i] = {
    id: `${i + 1}`,
    body: faker.lorem.sentences(),
    author: {
      username: faker.internet.userName(),
      avatar: faker.internet.avatar(),
      email: faker.internet.email()
    }
  };
}

// Middleware
server.use(bodyParser.json());

// RESTful API

// GET /tweets -> Get all the tweets
server.get('/tweets', (req, res) => {
  res.json(tweets);
});

// GET /tweets/1 -> Get the tweet with the id of 1
server.get('/tweets/:id', (req, res) => {
  const { id } = req.params;

  // findTweetById: [tweet] | []
  const findTweetById = tweets.filter((tweet) => {
    if (tweet.id === id) {
      return true;
    }

    return false;
  });

  if (findTweetById.length > 0) {
    res.json(findTweetById[0]);
  } else {
    res.status(404).json({
      message: `Tweet not found with id: ${id}`
    });
  }
});

// GET /tweets/new -> Display a form for making a new Tweet

// POST /tweets with { body } -> Make a new Tweet with the body
server.post('/tweets', (req, res) => {
  const { body } = req.body;
  const createTweet = (body) => ({
    id: faker.random.uuid(),
    body,
    author: {
      username: faker.internet.userName(),
      avatar: faker.internet.avatar(),
      email: faker.internet.email()
    }
  });
  const newTweet = createTweet(body);

  tweets.push(newTweet);

  res.redirect(`/tweets/${newTweet.id}`);
});

// GET /tweets/edit -> Display a form for editing a Tweet
// PUT /tweets/1 with { tweet }-> Edit a Tweet with the body
// DELETE /tweets/1 -> Delete a tweet

server.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
