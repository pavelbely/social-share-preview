const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.send('Hello'));

app.get('/share/:itemId', (req, res) => {
  const { skipRedirect, itemId } = req.query;
  const title = 'Your title';
  const description = 'Your description';

  // Slack supports animated gifs
  // Facebook, Twitter, Whatsapp use first frame of it
  const imageUrl = `https://${req.hostname}/animated.gif`;

  const itemRedirectUrl = 'https://google.com';
  const sharePageUrl = `https://${req.hostname}${req.path}`;
  const videoUrl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  const videoPlayerUrl = `https://${req.hostname}${req.path}?skipRedirect=true`;

  const isSlackBot = req.headers['user-agent'].match(/^Slackbot/);
  // Slack relies on twitter card but it can't render video, so we'll fallback to an image
  const twitterCard = isSlackBot ? 'summary_large_image' : 'player';
  
  const userAgent = req.headers['user-agent'];
  // Send analytic event from here with params itemId and userAgent
  // To measure to which platforms and what content your users share

  res.render('share', {
    title,
    description,
    imageUrl,
    itemRedirectUrl,
    sharePageUrl,
    skipRedirect,
    twitterCard,
    videoUrl,
    videoPlayerUrl,
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});

module.exports = app;