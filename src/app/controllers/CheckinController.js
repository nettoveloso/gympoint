import * as Yup from 'yup';
import { addDays } from 'date-fns';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const checkins = await Checkin.findAll({
      where: { student_id: req.params.id },
    });

    res.json(checkins);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Erro na validação!' });
    }

    const { id } = req.params;

    const studentExists = await Student.findByPk(id);

    if (!studentExists) {
      return res.status(400).json({ error: 'Estudante não cadastrado' });
    }

    const checkinsExists = await Checkin.findAll({
      where: {
        student_id: req.params.id,
        createdAt: {
          [Op.between]: [addDays(new Date(), -7), addDays(new Date(), +7)],
        },
      },
    });

    if (checkinsExists.length > 5) {
      return res.status(400).json({
        error:
          'Você já utilizou as suas 5 entradas na academia nos ultimos 7 dias !',
      });
    }

    const student = {
      student_id: id,
    };

    const checkin = await Checkin.create(student);

    return res.status(200).json(checkin);
  }
}

export default new CheckinController();
