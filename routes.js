import { Router } from 'express';
import dates from './controllers.js';

let router = Router();

router.route('/pedidos').get(dates.getAllDates).post(dates.createDate);
router.route('/pedidos/:id').get(dates.getDate).put(dates.updateDate).delete(dates.deleteDate);


export default router