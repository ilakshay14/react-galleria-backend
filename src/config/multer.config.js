const multer = require('multer');
const path = require('path');

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

exports.uploadImageSingle = (value) => {
    return upload.single(value);
}
