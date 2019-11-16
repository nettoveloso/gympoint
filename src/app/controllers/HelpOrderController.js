import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  async index(req, res) {
    const helpOrder = await HelpOrder.findAll({
      where: { student_id: req.params.id },
    });

    res.json(helpOrder);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro na validação!' });
    }

    const { question } = req.body;

    const helpOrder = await HelpOrder.create({
      question,
      student_id: req.params.id,
    });

    return res.status(200).json(helpOrder);
  }
}

export default new HelpOrderController();
