const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.send('Hello'));

app.get('/shared/:itemId', (req, res) => {
  const { skipRedirect } = req.query;
  const title = 'Item title';
  const description = 'Item description';
  const imageUrl = `https://${req.hostname}/image.jpg`;
  const itemRedirectUrl = 'https://google.com';
  const sharePageUrl = `https://${req.hostname}${req.path}`;
  const videoUrl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  const videoPlayerUrl = `https://${req.hostname}${req.path}?skipRedirect=true`;
  const isSlackBot = req.headers['user-agent'].match(/^Slackbot/);
  // Slack has issues rendering video in message preview, so we'll render an image
  const twitterCard = isSlackBot ? 'summary_large_image' : 'player';

  res.render('shared', {
    title,
    description,
    imageUrl,
    itemRedirectUrl,
    sharePageUrl,
    twitterCard,
    skipRedirect,
    videoUrl,
    videoPlayerUrl,
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});

module.exports = app;