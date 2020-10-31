const fs = require('fs');

exports.getImageURLs = (req, res) => {
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
};

exports.uploadImage = (req, res) => {
    try {
        return res.status(201).json({
            message: 'Image uploaded successfully'
        })
    } catch (error) {
        console.log(error);
    }
}