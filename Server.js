const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tasksRoutes');
const authRoutes = require('./routes/userRoutes');
const subtaskRoutes = require('./routes/subtaskRoutes');
const auth = require('./middleware/auth');
const { config } = require('dotenv');
const app = express();


config();



// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', authRoutes); 
app.use('/api/tasks', subtaskRoutes); 

app.use("/", (req, res) => {
  res.json({ message: "Welcome to the H2S Assessment Backend" });
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ "err0r" : "Internal Server Error" });
});

// MongoDB connection (example URI, replace with your own)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error connecting to MongoDB', error.message);
})

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
