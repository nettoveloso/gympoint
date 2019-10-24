import { Router } from 'express';
import UserController from './app/controllers/UserController';
import StudentControlller from './app/controllers/StudentController';
import SessionContoller from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionContoller.store);

// Rotas Autenticadas
routes.use(authMiddleware);

// Rotas de Usuário
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

// Rotas de Alunos
routes.get('/students', StudentControlller.index);
routes.post('/students', StudentControlller.store);
routes.put('/students/:id', StudentControlller.update);

export default routes;
