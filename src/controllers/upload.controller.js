const fs = require('fs');
const DB = require('../schema/index');

exports.getImageURLs = (req, res) => {

    DB.imageModel.find({ type: 'gallery'}).exec((err, images) => {
        if(err){
            res.status(500).send({
                message: "Images not found"
            });
            return;
        }
        res.status(200).send(images);
        return;

    })

    // fs.readdir('./uploads', (err, files) => {
    //     if(err){
    //         res.status(500).send({
    //             message: "unable to read dir"
    //         });
    //     }

    //     let allFiles = [];
    //     files.map(file=>{
    //         allFiles.push(
    //             `http://192.168.29.173:3000/random/${file}`
    //         );
    //     });

    //     res.status(200).send(allFiles);

    // })
};

exports.uploadImage = (req, res) => {
    
    //console.log(req.file.path.replace('uploads/', ""));
    try {
        let file = req.file.path.replace('uploads/', "");
        console.log(file);
        const Image = new DB.imageModel({
            url: `http://192.168.29.173:3000/random/${file}`,
            type: 'gallery'
        });
        
        Image.save((err, image)=> {
            if(image){
                console.log(image);
                res.status(201).json(image);
                return;
            }
            else{
                res.status(500).send({ message: err });
                
                return;
            }
        })
        
    } catch (error) {
        console.log(error);
    }
}