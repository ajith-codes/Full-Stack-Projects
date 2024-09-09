import { Router } from 'express';
import multer from 'multer';
import { handleFileUpload } from '../controllers/employeeController';

// Setup file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

const router = Router();

router.post('/upload', upload.single('file'), handleFileUpload);

export default router;
