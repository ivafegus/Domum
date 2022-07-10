const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000
const connectDB = require('./config/db')
const cron = require('node-cron')
const {scrap} = require('./controllers/apartmentController')

connectDB()

const app = express()

var cors = require('cors');
var allowedOrigins = ['http://localhost:5001', "https://ekonomija-stanovanja.herokuapp.com"];
app.use(cors({
  credentials: true,
  origin: function(origin, callback){
    // Allow requests with no origin (mobile apps, curl)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin)===-1){
      var msg = "The CORS policy does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/apartments', require('./routes/apartmentRoutes'));
app.use('/api/buildings', require('./routes/buildingRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/water', require('./routes/waterRoutes'))
app.use('/api/electricity', require('./routes/electricityRoutes'))
app.use('/api/gas', require('./routes/gasRoutes'))

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})

// Runs scraping every day at midnight automatically
cron.schedule('0 0 * * *', () => {
  scrap()
});