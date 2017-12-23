const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const bodyParser = require('body-parser')
const db = require('./db/index.js')
const app = express();

const compiler = webpack(webpackConfig);

app.use(bodyParser.json());

app.use(express.static(__dirname + '/www'));

app.get('/leaderboards', (req, res)=> {
  db.top100((scores, cheese)=> {
    res.send(JSON.stringify({
      scores: scores,
      cheese: cheese
    }))
  })
})

app.post('/leaderboards', (req, res)=> {
  db.save(req.body)
  res.send(req.body)
})

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true
  },
  historyApiFallback: true
}));

const port = process.env.PORT || 3000;

const server = app.listen(3000, ()=> {
  const host = server.address().address;
  console.log('Listening at http://' + host + ':' + port);
})
