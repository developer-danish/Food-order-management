const express = require('express');
const connectDB = require('./database/db');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');

// middleware...
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);

connectDB();
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Listening to app on", port);
});
