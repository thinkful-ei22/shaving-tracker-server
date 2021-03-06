

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cloudinary = require('cloudinary');

// get auth
const passport = require('passport');
const localStrategy = require('./passport/local');
const jwtStrategy = require('./passport/jwt');

const {
  PORT, CLIENT_ORIGIN, API_KEY, API_SECRET, CLOUD_NAME,
} = require('./config');
const { dbConnect } = require('./db-mongoose');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const userProductRouter = require('./routes/userProducts');
const shaveRouter = require('./routes/shaves');
const imageRouter = require('./routes/images');
const communityRouter = require('./routes/community');

const app = express();

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

app.use(express.json());

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    // eslint-disable-next-line no-unused-vars
    skip: (req, res) => process.env.NODE_ENV === 'test',
  }),
);

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  }),
);

// Utilize local strategy for login
passport.use(localStrategy);

// Utilize JWS strategy for login
passport.use(jwtStrategy);

// routers
app.use('/api/v1/user', userRouter);
app.use('/api/v1', authRouter);
app.use('/api/v1/products/personal', userProductRouter);
app.use('/api/v1/shaves/', shaveRouter);
app.use('/api/v1/image', imageRouter);
app.use('/api/v1/community/', communityRouter);

// Custom 404 Not Found route handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Custom Error Handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.status) {
    const errBody = Object.assign({}, err, { message: err.message });
    res.status(err.status).json(errBody);
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', (err) => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
