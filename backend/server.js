const express = require('express');
const connectDB = require('./config/db');
const app = express();

const cors = require('cors');



// Connect DB
connectDB()
/// Init Middleware

app.use(cors());
app.use(express.json({extended: false}))

// app.get('/',(req,res) => res.send('API Running'));

// Define Routes
app.use('/api/users/signup', require('./routes/signup'));
app.use('/api/users/login', require('./routes/login'));
app.use('/api/users', require('./routes/user'));



const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));