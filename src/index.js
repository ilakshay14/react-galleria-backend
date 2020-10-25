const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.urlencoded({extended: true}));

app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/images', express.static(path.join(__dirname, '/uploads')));



app.use('/random', express.static('./uploads/'))
// storage config using multer

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
        //cb = callback function
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype == 'image/jpeg' || 
        file.mimetype == 'image/png' || 
        file.mimetype == 'image/jpg'){
            cb(null, true);
        } else {
            cb(null, false);
        }
};

const upload = multer({ storage: storage, fileFilter: fileFilter});

app.post('/upload', upload.single('image'), (req, res, next) => {
    //console.log(req.body);
    try {
        return res.status(201).json({
            message: 'Image uploaded successfully'
        })
    } catch (error) {
        console.log(error);
    }
})

app.get('/images', (req, res)=> {
    fs.readdir('./uploads', (err, files) => {
        if(err){
            res.status(500).send({
                message: "unable to read dir"
            });
        }

        let allFiles = [];
        files.map(file=>{
            allFiles.push(
                `http://192.168.29.173:3000/random/${file}`
            );
        });

        res.status(200).send(allFiles);

    })
    

});

app.get('/image', (req, res) => {
    const filename = req.body.name;
    res.download(`./uploads/${filename}`, (err) => {
        if(err){
            res.status(500).send({
                message: "Unable to send the file"
            })
        }
    })
})



app.get('/', (req, res) => {
    res.status(200).send('Hello world');
});

app.listen(port, () => console.log(`App listening on port ${port}!`));