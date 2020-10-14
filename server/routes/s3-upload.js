const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const express = require('express');
const path = require('path');
const { protect } = require('../middleware/auth');

const router = express.Router();

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
});

const s3 = new aws.S3();

const checkFileType = (file, cb) => {
  const filetypes = /jpg|jpeg|png|svg/;
  const ext = path.extname(file.originalname).toLowerCase();
  const extname = filetypes.test(ext);
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
};

const fileFilter = (req, file, cb) => {
  return checkFileType(file, cb);
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: process.env.AWS_DEV_BUCKET,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `photo_${file.fieldname}_${Date.now()}${ext}`);
    },
  }),
});

router.route('/').post(protect, upload.single('image'), (req, res) => {
  res.status(200).json(req.file.location);
});

module.exports = router;
