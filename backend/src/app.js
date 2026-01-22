const express = require('express');
const authRoutes = require('./routes/auth.routes');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const foodRoutes = require('./routes/food.routes');
const cors = require('cors');
const foodPartnerRoutes = require('./routes/food-partner.routes');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// Allow local dev frontends on common Vite ports (5173/5174)
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/auth', authRoutes); 
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

module.exports = app;
