const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const hbs = require('express-handlebars');
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
server.use(bodyParser.urlencoded({ extended: true }));
server.use(methodOverride('_method'));

// Templating
server.engine('.hbs', hbs({
  defaultLayout: 'main',
  extname: '.hbs',
}));
server.set('view engine', '.hbs');

// RESTful API

// GET /tweets -> Get all the tweets
server.get('/tweets', (req, res) => {
  res.json(tweets);
});

// GET /tweets/new -> Display a form for making a new Tweet
server.get('/tweets/new', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views/tweets.new.html'));
});

/**
 * type TweetType = {
 *   id: string;
 *   body: string;
 *   author: AuthorType;
 * };
 */

// findTweetById(id: string): false | TweetType
function findTweetById(id) {
  const tweet = tweets.filter((tweet) => {
    if (tweet.id === id) {
      return true;
    }

    return false;
  });

  if (!tweet[0]) {
    return false;
  }

  return tweet[0];
}

// GET /tweets/1 -> Get the tweet with the id of 1
server.get('/tweets/:id', (req, res) => {
  const { id } = req.params;
  const tweet = findTweetById(id);

  if (tweet) {
    res.json(tweet);
  } else {
    res.status(404).json({
      message: `Tweet not found with id: ${id}`
    });
  }
});

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

  res.redirect('/tweets');
});

// GET /tweets/:id/edit -> Display a form for editing a Tweet
server.get('/tweets/:id/edit', (req, res) => {
  const { id } = req.params;
  const tweet = findTweetById(id);

  res.render('tweets/edit', { tweet });
});

// PUT /tweets/1 with { tweet }-> Edit a Tweet with the body
server.put('/tweets/:id', (req, res) => {
  const { id } = req.params;

  console.log(req.body);

  res.redirect(`/tweets/${id}`);
});


// DELETE /tweets/1 -> Delete a tweet

server.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
