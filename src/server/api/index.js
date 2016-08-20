import {
  Router,
} from 'express';

import forward from './forward';
import issue from './issue';
import refresh from './refresh';

const router = new Router();

router.get('/forward', forward);
router.get('/issue', issue);
router.get('/refresh', refresh);

export default router;
