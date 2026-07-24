import { Router } from 'express';
import { 
  getKey,
  storeKey,
  handleGetPoll
} from './services';

const router = Router();

router.get('/get/:key', getKey);
router.post('/store', storeKey);

router.get('/polls/:uuid', handleGetPoll);
// router.post('/polls/:uuid/vote', handlePollVote);
// router.post('/polls/create', handleCreatePoll);

export const routes = router;