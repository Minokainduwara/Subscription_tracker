import {Router} from 'express';

const userRouter = Router();

//GET /users --> Get all users
//GET /users/:id --> Get users by id

userRouter.get('/users',(req, res) => res.send({tittle: 'GET all users'}));

userRouter.get('/:id',(req, res) => res.send({tittle: 'GET user details'}));

userRouter.post('/',(req, res) => res.send({tittle: 'CREATE new users'}));

userRouter.put('/:id',(req, res) => res.send({tittle: 'UPDATE user by id'}));

userRouter.delete('/:id',(req, res) => res.send({tittle: 'Delete user by id'}));

export default userRouter;
