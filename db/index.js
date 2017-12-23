const mongoose = require('mongoose');
const url = process.env.MONGODB_URI || 'mongodb://localhost/mousemania';
mongoose.connect(url);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to database')
});

const mouseSchema = mongoose.Schema({
  name: String,
  highScore: Number,
  totalCheese: Number,
  date: String
})

const Mouse = mongoose.model('Mouse', mouseSchema);

let save = (savedScores)=> {
  Mouse.find({date: savedScores.date}).exec((err, docs)=> {
    if (err) {
      throw err;
    }
    let highestScore = savedScores.highScore;
    if (docs.length > 0) {
      if (highestScore < docs[0].highScore) {
        highestScore = docs[0].highScore;
      }
    }
    Mouse.update(
      {date: savedScores.date},
      {
        name: savedScores.name,
        highScore: highestScore,
        totalCheese: savedScores.totalCheese,
        date: savedScores.date
      },
      {upsert: true},
      (err, doc)=> {
        if (err) {
          throw err;
        }
      }
    )
  })
}

let top100 = (cb)=> {
  Mouse.find({}).sort('-highScore').limit(100).exec((err, docs)=> {
    if (err) {
      throw err;
    }
    let scores = docs;
    Mouse.find({}).sort('-totalCheese').limit(100).exec((err, docs)=> {
      if (err) {
        throw err;
      }
      let cheese = docs;
      cb(scores, cheese);
    })
  })
}

module.exports.save = save;
module.exports.top100 = top100;