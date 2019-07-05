import express = require('express');
import morgan = require('morgan');
import cors = require('cors');
import bodyParser = require('body-parser');

const app: express.Application = express();

app.use(morgan('dev', {
  stream: {
    write: (text: string) => {
      console.log(text);
    },
  },
}));
app.use(cors());
app.use('/', express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));

const Parse = require('parse/node');
Parse.initialize(process.env.APPLICATION_ID);
Parse.serverURL = process.env.PARSE_SERVER;

const query = new Parse.Query('ChatMessages');
const subscription = query.subscribe();

subscription.then(subscription => () => {
  subscription.on('open', () => {
    console.log('subscription opened');
  });

  subscription.on('create', object => {
    console.log('object created');
    console.log(object);
  });
});

app.get('/', (req, res) => {
  res.send('hello');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});