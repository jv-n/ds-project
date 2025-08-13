import { Router } from 'express';
import { upload } from '../services/uploadService';
import { DonationController } from '../controllers/donationController';

const DonationRouter = Router();
const controller = new DonationController();

DonationRouter.post('/', upload.array('documents', 5), controller.create);

// Audit routes
DonationRouter.get('/audit/', controller.getAll);
DonationRouter.get('/audit/status/:status', controller.getByStatus);
DonationRouter.get('/:id/audit/documents/', controller.getDocumentsByDonationId);
DonationRouter.get('/:id/audit/documents/:documentId', controller.getDocumentById);
DonationRouter.patch('/:id/audit/approve/', controller.approveDonation);
DonationRouter.patch('/:id/audit/reject/', controller.rejectDonation);

export default DonationRouter;

