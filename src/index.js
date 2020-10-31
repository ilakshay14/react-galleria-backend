const express = require('express');

const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const DB = require('./schema/index');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}));

app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/images', express.static(path.join(__dirname, '/uploads')));
app.use('/random', express.static('./uploads/'))

DB.mongoose.connect(DB.url, { useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Connect to DB on cloud');
})

require('./routes/files')(app);

app.get('/', (req, res) => {
    res.status(200).send('Hello world');
});

app.listen(port, () => console.log(`App listening on port ${port}!`));