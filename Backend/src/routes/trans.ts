import express from 'express';
const router = express.Router();
import { Trans_Add, View_Trans } from '../controllers/trans';
import {checkToken} from '../middleware/authValidation';

router.post('/transaction',checkToken, Trans_Add);
router.get('/transaction',checkToken, View_Trans);
router.put('/transaction/:id',checkToken, Edit_Trans);
router.delete('/transaction/:id',checkToken, Delete_Trans);



export { router };
