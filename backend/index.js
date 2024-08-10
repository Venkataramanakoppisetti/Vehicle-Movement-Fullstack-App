const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const vehicleRoutes = require('./routes/vehicle'); 


dotenv.config(); 
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/vehicle', vehicleRoutes); 
app.get('/', (req, res) => {
    res.send('Welcome to the Vehicle Movement Backend');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
    console.log('Backend is working fine...!!!')
})