import { Router } from 'express';
import { 
  getKey,
  storeKey
} from './services';

const router = Router();

router.get('/get/:key', getKey);
router.post('/store', storeKey);

export const routes = router;