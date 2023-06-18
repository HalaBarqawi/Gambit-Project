import express from 'express';
import {
  Add_Notification,
  delete_Notification,
  Edit_Notification,
  view_Notification,
} from '../controllers/notification';
const router = express.Router();
import { checkToken } from '../middleware/authValidation';

router.get('/preferences/:id/notifications', checkToken, view_Notification);
router.post('/preferences/:id/notifications', checkToken, Add_Notification);
router.put(
  '/preferences/:id/notifications/:id_notification',
  checkToken,
  Edit_Notification
);
router.delete(
  '/preferences/:id/notifications/:id_notification',
  checkToken,
  delete_Notification
);

export { router };
