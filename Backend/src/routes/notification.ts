import express from 'express';
import {
  postNotification,
  deleteNotification,
  editNotification,
  getNotification,
} from '../controllers/notification';
const router = express.Router();
import { checkToken } from '../middleware/authValidation';

router.get('/preferences/:id/notifications', checkToken, getNotification);
router.post('/preferences/:id/notifications', checkToken, postNotification);
router.put(
  '/preferences/:id/notifications/:id_notification',
  checkToken,
  editNotification
);
router.delete(
  '/preferences/:id/notifications/:id_notification',
  checkToken,
  deleteNotification
);

export { router };
