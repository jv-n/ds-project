import { Router } from 'express';
import { upload } from '../services/uploadService';
import { DonationController } from '../controllers/donationController';

const router = Router();
const controller = new DonationController();

router.post('/', upload.array('documents', 5), controller.create);

// Audit routes
router.get('/audit/', controller.getAll);
router.get('/audit/status/:status', controller.getByStatus);
router.get('/:id/audit/documents/', controller.getDocumentsByDonationId);
router.get('/:id/audit/documents/:documentId', controller.getDocumentById);
router.patch('/:id/audit/approve/', controller.approveDonation);
router.patch('/:id/audit/reject/', controller.rejectDonation);

export default router;