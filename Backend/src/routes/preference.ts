import express from 'express';
const router = express.Router();
import {
  postPreference,
  deletePreference,
  editPreference,
  getPreferenceId,
  getPreference,
} from '../controllers/preference';
import { checkToken } from '../middleware/authValidation';

router.get('/preferences', checkToken, getPreference);
router.get('/preferences/:id', checkToken, getPreferenceId);
router.post('/preferences', checkToken, postPreference);
router.put('/preferences/:id', checkToken, editPreference);
router.delete('/preferences/:id', checkToken, deletePreference);

export { router };
