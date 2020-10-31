
const {uploadImageSingle} = require('../config/multer.config');
const controller = require('../controllers/upload.controller');

module.exports = (app) => {
    app.post('/upload', uploadImageSingle('image'), controller.uploadImage);
    
    app.get('/images', controller.getImageURLs);
}