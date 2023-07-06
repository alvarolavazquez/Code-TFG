const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");
const { mongodb } = require('./keys');

const storage = new GridFsStorage({
    url: mongodb.URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        console.log(file._id)
        return {
            bucketName: "SubscriptionFiles",
            filename: `${Date.now()}-${file.originalname}`,
            ID: file._id
        };
    },
});

module.exports = multer({ storage });
