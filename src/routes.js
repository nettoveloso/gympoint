import { Router } from 'express';
import UserController from './app/controllers/UserController';
import StudentControlller from './app/controllers/StudentController';
import SessionContoller from './app/controllers/SessionController';
import PlanControlller from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import AnswerHelpController from './app/controllers/AnswerHelpController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionContoller.store);

routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

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
routes.put('/students-registrations/:id', RegistrationController.update);
routes.delete('/students-registrations/:id', RegistrationController.delete);

// Pedido de Auxilio
routes.get('/students/:id/help-orders', HelpOrderController.index);
routes.post('/students/:id/help-orders', HelpOrderController.store);

// Responder Auxilio
routes.get('/help-orders', AnswerHelpController.index);
routes.post('/help-orders/:id/help-answer', AnswerHelpController.store);

export default routes;
