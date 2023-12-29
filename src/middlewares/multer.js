import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    const fileExtension = file.mimetype.split('/')[1];
    const fileName = uuidv4() + '.' + fileExtension;
    cb(null, fileName);
  },
});

export const upload = multer({ storage: storage });
