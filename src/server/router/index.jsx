import {
  Router,
} from 'express';

const router = new Router();
export default router;

import {
  forward,
  issue
} from './api';
import render from './render';

router.get('/api/forward', forward);
router.get('/api/issue', issue);

router.all('*', render);
