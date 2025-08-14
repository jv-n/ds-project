import { Router } from 'express';
import path from 'path';
import multer from 'multer';
import { FileController } from '../controllers';


const uploadFolder = path.resolve(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        const extensaoArquivo = path.extname(file.originalname);

        const dat = Date.now();
        const dataHora = new Date(dat);
        const data = `${dataHora.getDate()}-${(dataHora.getMonth()+1).toString()}-${dataHora.getFullYear()}`;
        const novoNomeArquivo = `${data}--${dataHora.getUTCHours().toString()}-${dataHora.getUTCMinutes().toString()}-${dataHora.getUTCSeconds().toString()}`;

        cb(null, `${novoNomeArquivo}${extensaoArquivo}`)
    }
});
const upload = multer({ storage });

const FileRouter = Router();

FileRouter.route('/upload').post(upload.array('file', 5), (req, res, next) => FileController.upload(req, res, next));

FileRouter.route('/debug').post(upload.any(), (req, res, next) => FileController.debug(req, res, next));

FileRouter.route('/:id').delete((req, res, next) => FileController.delete(req, res, next));

export default FileRouter;
