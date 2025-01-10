const dotenv = require('dotenv');
const connectDB = require('./db/db');
dotenv.config();
connectDB();
const cors = require('cors');
const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const captainRoutes = require('./routes/captain.routes');
const mapRoutes = require('./routes/maps.routes')
const rideRoutes = require('./routes/ride.routes')

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapRoutes);
app.use('/rides', rideRoutes);

module.exports = app;