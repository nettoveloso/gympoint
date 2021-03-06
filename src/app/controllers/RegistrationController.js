/* eslint-disable camelcase */
import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Registration from '../models/Registration';

import WelcomeMail from '../jobs/WelcomeMail';
import Queue from '../../libs/Queue';

class RegistrationController {
  async index(req, res) {
    const registration = await Registration.findAll();

    return res.status(200).json(registration);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro na validação!' });
    }

    const { start_date, student_id, plan_id } = req.body;

    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res.status(400).json({ error: 'Estudante não cadastrado' });
    }

    const plan = await Plan.findByPk(plan_id);

    const registration = await Registration.create({
      start_date,
      student_id,
      plan_id,
      end_date: addMonths(parseISO(start_date), plan.duration),
      price: plan.duration * plan.price,
    });

    await Queue.add(WelcomeMail.key, {
      registration,
      student: studentExists,
      plan,
    });

    return res.status(200).json(registration);
  }

  async update(req, res) {
    const { id } = req.params;
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro na validação!' });
    }

    const { start_date, student_id, plan_id } = req.body;

    const registration = await Registration.findByPk(id);

    const studentExists = await Student.findByPk(student_id);

    const plan = await Plan.findByPk(plan_id);

    if (!studentExists) {
      return res.status(400).json({ error: 'Estudante não cadastrado' });
    }

    const registrationUpdate = await registration.update({
      start_date,
      student_id,
      plan_id,
      end_date: addMonths(parseISO(start_date), plan.duration),
      price: plan.duration * plan.price,
    });

    return res.json({ registrationUpdate });
  }

  async delete(req, res) {
    const registration = await Registration.findByPk(req.params.id);

    if (!registration) {
      return res.status(400).json({ error: 'Matricula não cadastrada' });
    }

    const registrationDelete = await registration.destroy();

    if (registrationDelete) {
      return res.json({ message: 'Matricula excluida com sucesso!' });
    }

    return res.json({ error: 'Não foi possivel excluir a matricula!' });
  }
}

export default new RegistrationController();
