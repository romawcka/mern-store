import express from 'express';
import multer from 'multer';
import path from 'path';

export const router = express.Router();

// @@desc -> define where store files
const storage = multer.diskStorage({
  // @@desc -> where store files
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  // @@desc -> define the file name
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

// @desc -> fn for types cheching
function checkFileType(req, file, cb) {
  const filetypes = /jpg|jpeg|png/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

// @@desc -> cb structure: (firsPlace: Error, otherValue), so when we do not need error - pass <<null>> otherwise write something at the first place

const upload = multer({
  storage,
  checkFileType,
});

router.post('/', upload.single('image'), (req, res) => {
  res.send({
    message: 'Image Uploaded',
    image: `/${req.file.path}`,
  });
});
