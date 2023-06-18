import express from 'express';
const router = express.Router();
import { Trans_Add, transaction } from '../controllers/trans';
import checkToken from '../middleware/authValidation';

router.post('/newTrans/:id',checkToken, Trans_Add);
router.get('/transaction/:id',checkToken, transaction);



export { router };
