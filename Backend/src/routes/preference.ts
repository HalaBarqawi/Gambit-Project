import express from 'express';
const router = express.Router();
import {
  Add_Pref,
  delete_Pref,
  Edit_Pref,
  view_Apref,
  view_Pref,
} from '../controllers/preference';
import { checkToken } from '../middleware/authValidation';

router.get('/preferences', checkToken, view_Pref);
router.get('/preferences/:id', checkToken, view_Apref);
router.post('/preferences', checkToken, Add_Pref);
router.put('/preferences/:id', checkToken, Edit_Pref);
router.delete('/preferences/:id', checkToken, delete_Pref);

export { router };
