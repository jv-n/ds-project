import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { DonationController } from '../controllers/donationController';



const DonationRouter = Router();
const controller = new DonationController();
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

DonationRouter.post('/', upload.array('documents', 5), controller.create);

// Audit routes
DonationRouter.get('/audit/', controller.getAll);
DonationRouter.get('/audit/status/:status', controller.getByStatus);
DonationRouter.get('/:id/audit/documents/', controller.getDocumentsByDonationId);
DonationRouter.get('/:id/audit/documents/:documentId', controller.getDocumentById);
DonationRouter.patch('/:id/audit/approve/', controller.approveDonation);
DonationRouter.patch('/:id/audit/reject/', controller.rejectDonation);

export default DonationRouter;

