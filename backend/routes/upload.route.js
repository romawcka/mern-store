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
function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Images only!'), false);
  }
}

// @@desc -> cb structure: (firsPlace: Error, otherValue), so when we do not need error - pass <<null>> otherwise write something at the first place

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      res.status(400).send({ message: err.message });
    }

    res.status(201).send({
      message: 'Image uploaded successfully',
      image: `/${req.file.path}`,
    });
  });
});
