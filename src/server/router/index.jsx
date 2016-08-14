import {
  Router,
} from 'express';

const router = new Router();
export default router;

import render from './render';

router.all('*', render);
