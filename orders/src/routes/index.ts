import express, { Request, Response } from 'express';
import { requireAuth } from '@nksgtickets/common';

const router = express.Router();
import { Order } from '../models/order';

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate('ticket');

  res.send(orders);
});

export { router as indexOrderRouter };
