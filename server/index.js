const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
dotenv.config();

// Use async/await for mongoose connection
async function connectToDB() {
    try {
        // Ensure there's no space in your environment variable name
        await mongoose.connect(process.env.MONGO_URL,);
        console.log("CONNECTED TO MONGO DB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

// Call the function to connect to MongoDB
connectToDB();


// middleware
app.use(helmet());
app.use(express.json());
app.use(morgan('common'));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.listen(8800, () => {
    console.log("Server started on port 8800");
});
