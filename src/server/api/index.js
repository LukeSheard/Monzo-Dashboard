import {
  Router,
} from 'express';

import forward from './forward';
import issue from './issue';

const router = new Router();

router.get('/forward', forward);
router.get('/issue', issue);

export default router;
