import { Router } from 'express';
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import { FileController } from '../controllers';

// Use consistent upload folder - same as FileRepository
const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
    console.log(`📁 Upload directory created: ${uploadFolder}`);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        const extensaoArquivo = path.extname(file.originalname);
        
        const now = new Date();
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        
        const novoNomeArquivo = `${day}-${month}-${year}--${hours}-${minutes}-${seconds}`;
        const finalName = `${novoNomeArquivo}${extensaoArquivo}`;
        
        console.log(`📄 Generating filename: ${finalName}`);
        cb(null, finalName);
    }
});

// Configure multer with file size and type validation
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
            cb(new Error(`Tipo de arquivo não permitido: ${file.mimetype}. Tipos permitidos: PDF, JPEG, PNG`));
        }
    }
});

const FileRouter = Router();

// Single file upload
FileRouter.route('/upload').post(
    upload.single('file'), 
    (req, res, next) => FileController.upload(req, res, next)
);

// Multiple files upload (up to 5)
FileRouter.route('/upload/multiple').post(
    upload.array('files', 5), 
    (req, res, next) => FileController.upload(req, res, next)
);

// Debug route
FileRouter.route('/debug').post(
    upload.any(), 
    (req, res, next) => FileController.debug(req, res, next)
);

// Delete file by ID and filename
FileRouter.route('/:id/:filename').delete(
    (req, res, next) => FileController.delete(req, res, next)
);

export default FileRouter;