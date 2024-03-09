const express = require('express');
const bodyParser = require('body-parser');
const https = require('https'); // Import HTTPS module
const fs = require('fs'); // Import File System module
const app = express();
const dotenv = require('dotenv');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const jobRoute = require('./routes/job');
const bookmarkRoute = require('./routes/bookmark');
const chatRoute = require('./routes/chat');
const messageRoute = require('./routes/messages');

dotenv.config();

const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('connected to the db'))
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/', authRoute);
app.use('/api/users', userRoute);
app.use('/api/jobs', jobRoute);
app.use('/api/bookmarks', bookmarkRoute);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute);

const privateKey = fs.readFileSync('server.key'); // Read SSL private key
const certificate = fs.readFileSync('server.cert'); // Read SSL certificate

const credentials = { key: privateKey, cert: certificate }; // Create credentials object

const port = process.env.PORT || 4000;
const ip = 'jobquest1.up.railway.app';

// Create HTTPS server
const server = https.createServer(credentials, app);

server.listen(port, ip, () =>
  console.log(`Server is running on https://${ip}:${port}`)
);




// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const dotenv = require('dotenv');

// const authRoute = require('./routes/auth');
// const userRoute = require('./routes/user');
// const jobRoute = require('./routes/job');
// const bookmarkRoute = require('./routes/bookmark');
// const chatRoute = require('./routes/chat');
// const messageRoute = require('./routes/messages');

// dotenv.config();

// const mongoose = require('mongoose');
// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => console.log('connected to the db'))
//   .catch((err) => {
//     console.log(err);
//   });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/api/', authRoute);
// app.use('/api/users', userRoute);
// app.use('/api/jobs', jobRoute);
// app.use('/api/bookmarks', bookmarkRoute);
// app.use('/api/chats', chatRoute);
// app.use('/api/messages', messageRoute);

// var port = process.env.PORT || 4000;
// const ip = 'jobquest1.up.railway.app';
// //const ip = '192.168.114.93';
// app.listen(port, () =>
//   console.log(`Server is running on http://${ip}:${port}`)
// );
