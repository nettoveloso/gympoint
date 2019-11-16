import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';

class AnswerHelpController {
  async index(req, res) {
    const helpOrder = await HelpOrder.findAll({
      where: { answer: null },
    });

    res.json(helpOrder);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro na validação!' });
    }

    const helpOrder = await HelpOrder.findByPk(req.params.id);

    const { answer } = req.body;

    const helpOrderUpdate = await helpOrder.update({
      answer,
      answerAt: new Date(),
    });

    return res.status(200).json(helpOrderUpdate);
  }
}

export default new AnswerHelpController();
