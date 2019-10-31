import { Router } from 'express';
import UserController from './app/controllers/UserController';
import StudentControlller from './app/controllers/StudentController';
import SessionContoller from './app/controllers/SessionController';
import PlanControlller from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
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

// Rotas do Plano
routes.get('/plans', PlanControlller.index);
routes.post('/plans', PlanControlller.store);
routes.put('/plans/:id', PlanControlller.update);
routes.delete('/plans/:id', PlanControlller.delete);

// Matricula do Aluno
routes.get('/students-registrations', RegistrationController.index);
routes.post('/students-registrations', RegistrationController.store);
// routes.put('/plans/:id', RegistrationController.update);
// routes.delete('/plans/:id', RegistrationController.delete);

export default routes;
