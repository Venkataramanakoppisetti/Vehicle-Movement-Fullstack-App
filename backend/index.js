const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const vehicleRoutes = require('./routes/vehicle'); // Ensure the correct path


dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/vehicle', vehicleRoutes); // This should be a function, not a string

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
    console.log('Backend is working fine...!!!')
})