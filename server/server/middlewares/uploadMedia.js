const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype !== "image/jpeg" &&
    file.mimetype !== "image/jpg" &&
    file.mimetype !== "image/png"
  ) {
    const error = new Error(
      "Unsupported file type! Please upload only JPG, JPEG, or PNG images."
    );
    req.fileValidationError = error;
    return cb(error, false);
  }
  cb(null, true);
};

const uploadMedia = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 20000000 },
});

module.exports = uploadMedia;
