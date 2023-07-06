const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const { mongodb } = require('./keys');

const storage = new GridFsStorage({
    url: mongodb.URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return {
            bucketName: "SubscriptionFiles",
            filename: `${Date.now()}-${file.originalname}`
        };
    }
});

module.exports = multer({ storage });