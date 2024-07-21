import 'dotenv/config';
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import connectDB from './db/connect.js';
import homeRoutes from './routers/home.route.js'
import userRoutes from './routers/user.route.js'
import showRoutes from './routers/show.route.js'
import watchlistRoutes from './routers/watchlist.route.js'

const app = express();
app.use(express.json());
const corsConfig = {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors(corsConfig))
app.options("", cors(corsConfig))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 6001;

connectDB();

app.listen(PORT, () => {
  console.log(`the server is running on http://localhost:${PORT}`);
})

app.use('/', homeRoutes);
app.use('/', userRoutes);
app.use('/', showRoutes);
app.use('/', watchlistRoutes);
