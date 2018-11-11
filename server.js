const express = require('express');

const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('common'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/*
app.use((req, res, next) => {
  res.header('Access-Controller-Allow-Origin', '*');
  res.header('Access-Controller-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
      // header: res.header // to try later
  }
});
*/

app.get('/api/posts', (req, res) => {

    const posts = [
      { id: 1, title: "title1", body: 'body1' },
      { id: 2, title: "title2", body: 'body2' }
    ]

    res.json(posts);

})

app.get('/', (req, res) => {
    res.json({
        message: "11 index tigernodeandspace server"
    })
})

// Reaching here, no route has matched the request
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Sending the error, from the 404 or any other source
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

const port = 5000;
app.set('port', process.env.PORT || port)

app.listen(app.get("port"), () => console.log(
    `Server on port ${port}`
));