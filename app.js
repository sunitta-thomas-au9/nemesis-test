import express from 'express';
import cors from 'cors';
import * as path from 'path';
import session from 'express-session';
import user from './routes/userRoutes.js';
import './db/db.js';
import config from './config.js';

const app = express();
const PORT = process.env.PORT || 9800;

//parse data for post call
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors());

//creating session
app.use(session({
  'secret': config.secret,
  resave: false,
  saveUninitialized: true
}));

// Health check
app.get('/health', (req,res) => {
  res.send("Health OK!!")
})

app.use('/users', user);

app.get("*", (req, res) => {
  res.send("You've tried reaching a route that doesn't exist.")
})

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('./view/client/build'));

  const __dirname = path.resolve();
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'view', 'client', 'build', 'index.html'), (err) => {
      if(err) {
        return res.status(500).send(err);
      }
    })
  });
}

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})