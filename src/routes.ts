import { Router } from 'express';
import { 
  getKey,
  storeKey,
  handleGetPoll
} from './services';

const router = Router();

router.get('/get/:key', getKey);
router.post('/store', storeKey);

router.get('/api/polls/:uuid', handleGetPoll);
// router.post('/api/polls/:uuid/vote', handlePollVote);
// router.post('/api/polls/create', handleCreatePoll);

export const routes = router;