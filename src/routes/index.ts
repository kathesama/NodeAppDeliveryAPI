import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'I am alive',
  });
});

router.get('/api/v1', (req, res) => {
  res.json({
    message: 'Hello api v1...',
  });
});

export default router;
