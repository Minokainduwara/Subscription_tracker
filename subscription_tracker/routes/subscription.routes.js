import { Router } from 'express';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({tittle: 'Get all subscription'}));

subscriptionRouter.get('/:id', (req, res) => res.send({tittle: 'Get subscription details'}));

subscriptionRouter.post('/', (req, res) => res.send({tittle: 'CREATE subscription'}));

subscriptionRouter.put('/:id', (req, res) => res.send({tittle: 'UPDATE subscription'}));

subscriptionRouter.delete('/:id', (req, res) => res.send({tittle: 'DELETE subscription'}));

subscriptionRouter.get('/user/:id', (req, res) => res.send({tittle: 'GET all user subscription'}));

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({tittle: 'Cancel subscription'}));

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({tittle: 'GET upcoming renewals'}));




export default subscriptionRouter;