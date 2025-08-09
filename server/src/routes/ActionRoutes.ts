import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { ActionController } from '../controllers/ActionController';

const router = Router();
const controller = new ActionController();

// Use consistent upload folder - same as FileRepository
const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
    console.log(`📁 Upload directory created: ${uploadFolder}`);
}

// Configuração do multer para uploads
const storage = multer.diskStorage({
    destination: uploadFolder,
    filename: (_req, file, cb) => {
        const timestamp = Date.now();
        const extensaoArquivo = path.extname(file.originalname);
        const filename = `${timestamp}-${file.originalname.replace(/\s+/g, '_')}`;
        cb(null, filename);
    },
});

const upload = multer({ 
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error(`Tipo de arquivo não permitido: ${file.mimetype}`));
        }
    }
});

router.post('/', upload.single('documentacao'), controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', upload.single('documentacao'), controller.update);
router.delete('/:id', controller.delete);

export default router;