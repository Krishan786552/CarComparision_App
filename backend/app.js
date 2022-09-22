const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
global.carData = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "mock-car-data", "cars.json"))
)
const routes = require('./routes/cars');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, "public", "images")));

app.use(routes);

app.listen(4000, () => {
    console.log('listening on 4000');
});
